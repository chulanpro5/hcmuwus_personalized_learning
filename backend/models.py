DEBUG = True

import complete_prompt
from crawl_data import crawl_url
import debug_helper

import os
import openai
import json
from dotenv import load_dotenv
load_dotenv('./backend/key.env.local')
from RedisDatabase import *

# openai api key
openai.api_key = os.environ["OPENAI_API_KEY"]
OPENAI_EMBEDDINGS_ENGINE = "text-embedding-ada-002"
OPENAI_COMPLETIONS_ENGINE = "text-davinci-003"
MAX_TOKENS = 2000
TEMPERATURE = 0

# load prompt from json file
prompt_list =  json.load(open('./backend/prompt.json', 'r'))


class ModelInteraction():
    def __init__(self):
        pass
    
    def complete(self, prompt, max_tokens: int = MAX_TOKENS) -> str:
        response = openai.Completion.create(
            engine = OPENAI_COMPLETIONS_ENGINE,
            prompt = prompt,
            max_tokens = max_tokens,
            n = 1,
            stop = None,
            temperature = TEMPERATURE,
        )
        return response.choices[0].text.strip()

    def split_document(self, paragraph: str) -> list:
        """
        Input: paragraph
        Output: list of paragraph
        """
        if (DEBUG) : print("def split_document(self, paragraph: str) -> list:" + "\n")
        prompt = prompt_list["split_document"]["prefix"] + paragraph + prompt_list["split_document"]["suffix"]
        try:
            tmp = self.complete(prompt).replace('\n','')
            response = json.loads(tmp)
        except:
            debug_helper.save_to_json(tmp, "error.json")

        return response

    def extract_topic(self, paragraph: str) -> list:
        """
        Input: paragraph
        Output: list of topic
        """
        if (DEBUG) : print("def extract_topic(self, paragraph: str) -> list:" + "\n")
        prompt = prompt_list["extract_topic"]["prefix"] + paragraph + prompt_list["extract_topic"]["suffix"]
        response = json.loads(self.complete(prompt))

        return response

    def summarize_paragraph(self, paragraph: str) -> str:
        """
        Input: paragraph
        Output: paragraph
        """
        if (DEBUG) : print("def summarize_paragraph(self, paragraph: str) -> str:" + "\n")
        prompt = prompt_list["summarize"]["prefix"] + paragraph + prompt_list["summarize"]["suffix"]
        response = self.complete(prompt)
        return response

    def conditonal_summarize_paragraph(self, topics: list, paragraph: str) -> str:
        """
        Input: topics, paragraph
        Output: paragraph
        """
        if (DEBUG) : print("def conditonal_summarize_paragraph(self, topics: list, paragraph: str) -> str:" + "\n")
        prompt = complete_prompt.prompt_conditional_summary(topics, paragraph)
        response = self.complete(prompt)
        return response

    def expand_topics_from_clue(self, topics: list, paragraph: str, clue: str) -> str:
        """
        Input: topics, paragraph, clue
        Output: paragraph
        """
        if (DEBUG) : print("def expand_topics_from_clue(self, topics: list, paragraph: str, clue: str) -> str:" + "\n")
        prompt = complete_prompt.expand_topics_from_clue(topics, paragraph, clue)
        response = self.complete(prompt)
        return response

    def expand_topics_from_GPT(self, topics: list, paragraph: str) -> str:
        """
        Input: topics, paragraph
        Output: paragraph
        """
        if (DEBUG) : print("def expand_topics_from_GPT(self, topics: list, paragraph: str) -> str:" + "\n")
        prompt = complete_prompt.expand_topics_from_GPT(topics, paragraph)
        response = self.complete(prompt)
        return response

    def rephase_document(self, document: str) -> list:
        """
        Input: document
        Output: list of paragraph
        """
        if (DEBUG) : print("def rephase_document(self, document: str) -> list:" + "\n")
        prompt = prompt_list["rephrase_document"]["prefix"] + document + prompt_list["rephrase_document"]["suffix"]
        response = json.loads(self.complete(prompt).replace('\n','')) # remove newline character

        return response

class DocumentInteraction():
    def __init__(self):
        self.data = []
        self.paragraphs = []
        self.document = ""

        self.model = ModelInteraction()
        self.redis = RedisDatabase()
        self.redis.delete_data()
        self.redis.create_index()
        

    def insert_document(self, document: str) -> None:
        self.document = document

    def get_data(self) -> list:
        return self.data
    
    def set_data(self, data: list) -> None:
        self.data = data
    
    def get_document(self) -> str:
        return self.document

    def processing_document(self) -> None:
        """
        Input: document
        Output: list of list sentences
        """
        if (DEBUG) : print("def processing_document(self) -> None:" + "\n")
        self.document = self.document.replace('\n', ' ') # remove newline character
        self.paragraphs = self.model.split_document(self.document)
        result = ""
        for idx, paragraph in enumerate(self.paragraphs):
            result += self.processing_paragraph(paragraph) + ' '
            self.redis.insert_paragraph(f'para_{idx}', paragraph)
        
        self.paragraphs = self.model.rephase_document(result)
        
        
        for paragraph in self.paragraphs:
            self.data.append(self.paragraph_to_sentence(paragraph))

        return
    
    def user_click_sentence_expand(self, sentence: str) -> list:
        for idx, paragraph in enumerate(self.data):
            for s in paragraph:
                if(len(s) == 0):
                    continue
                if(s == sentence):
                    new_paragraph = ""
                    topics = self.model.extract_topic(s)
                    # check if the sentence is in redis database
                    query = self.redis.query_paragraph_from_sentence(s)
                    query = None
                    str_paragraph = ' '.join(paragraph)
                    if(query == None):
                        new_paragraph =  self.model.expand_topics_from_GPT(topics, str_paragraph)
                    else:
                        new_paragraph =  self.model.expand_topics_from_clue(topics, query, s)

                    new_paragraph = self.paragraph_to_sentence(new_paragraph)
                    print(new_paragraph)
                    # update the paragraph
                    self.data[idx] = new_paragraph
                    # insert each topic to redis database
                    for topic in topics:
                        self.redis.insert_topic(topic)
                    return new_paragraph
    
    def user_click_sentence_get_ref(self, sentence: str) -> str:
        for idx, paragraph in enumerate(self.data):
            for s in paragraph:
                if(len(s) == 0):
                    continue
                if(s == sentence):
                    query = self.redis.query_paragraph_from_sentence(s)
                    if(query == None):
                        return "This sentence is generated by GPT-3. There is no reference."
                    else:
                        return query
                

    def processing_paragraph(self, paragraph: str) -> str:
        """
        Input: paragraph
        Output: paragraph (summarized)
        """
        topics = self.model.extract_topic(paragraph)
        
        for topic in topics:
            if(self.redis.query_topic(topic) == None):
                topics.remove(topic)

        if(len(topics) == 0):
            return self.model.summarize_paragraph(paragraph)
        else:
            return self.model.conditonal_summarize_paragraph(topics, paragraph)

    def paragraph_to_sentence(self, paragraph: str) -> list:
        """
        Input: paragraph
        Output: list of sentences
        """
        sentences = paragraph.split('.')
        # remove empty string
        sentences = list(filter(None, sentences))
        return sentences
    

if __name__ == "__main__":
    # load text from text file
    # with open('wiki_1.txt', 'r') as file:
    #     text = file.read().replace('\n', '')
    test = DocumentInteraction()
    # test.insert_document(crawl_url("https://en.wikipedia.org/wiki/Artificial_intelligence"))
    # print(test.get_document())
    # test.processing_document()
    # data = json.dumps(test.get_data())
    # # save data to json file
    # with open('data.json', 'w') as file:
    #     file.write(data)
    # print(data)
    test.set_data(json.loads(open('data.json').read()))
    # test.user_click_sentence("AI is used in a wide range of topics and activities")
    # print(test.get_data())


""" Prompt
1. summarize 1 đoạn có điều kiện
2. generate nội dung cho topics dựa vào 1 đoạn từ nội dung gốc
3. generate nội dung cho topics từ GPT bth(không có ref)
4. rephrase toàn bộ document:
    - liên kết các câu với nhau
    - ngắt đoạn theo nội dung
"""
"""
def processing_paragraph():
    - extract the topic of the paragraph: extract_topic()
    - for each topic in extracted-topic:
        if topic is not in redis database: summarize_paragraph()
        if topic is in redis database:
            summarize_paragraph_prompt_1()
    
    - return the paragraph
"""

""" When user click on a sentence, expand the context of the sentence
    if the sentence is in redis database:
        expand the context by paragraph in redis database: prompt_2()
    if the sentence is not in redis database:
        expand the context by GPT-3 database: prompt_3()
"""

""" processing_document():
    - Split the document into paragraphs: split_paragraph()
    - for each paragraph in the document:
        - processing_paragraph()
    - merge the paragraphs
    - rephrase the document: prompt_4()
"""