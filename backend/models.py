#%%
import complete_prompt

import os
import openai
import json
from dotenv import load_dotenv
load_dotenv('./key.env')
from RedisDatabase import *


OPENAI_EMBEDDINGS_ENGINE = "text-embedding-ada-002"
OPENAI_COMPLETIONS_ENGINE = "text-davinci-003"
MAX_TOKENS = 2000
TEMPERATURE = 0

# load prompt from json file
#%%
redisDatabase = RedisDatabase()
#%%
prompt_list =  json.load(open('prompt.json', 'r'))
openai.api_key = os.environ["OPENAI_API_KEY"]
#%%

def complete(prompt, max_tokens: int = MAX_TOKENS) -> str:
    response = openai.Completion.create(
        engine = OPENAI_COMPLETIONS_ENGINE,
        prompt = prompt,
        max_tokens = max_tokens,
        n = 1,
        stop = None,
        temperature = TEMPERATURE,
    )
    return response.choices[0].text.strip()

def split_document(paragraph: str) -> list:
    """
    Input: paragraph
    Output: list of paragraph
    """
    prompt = prompt_list["split_document"]["prefix"] + paragraph + prompt_list["split_document"]["suffix"]
    response = json.loads(complete(prompt).replace('\n','')) # remove newline character

    return response

def extract_topic(paragraph: str) -> list:
    """
    Input: paragraph
    Output: list of topic
    """
    prompt = prompt_list["extract_topic"]["prefix"] + paragraph + prompt_list["extract_topic"]["suffix"]
    response = json.loads(complete(prompt))

    return response

def summarize_paragraph(paragraph: str) -> str:
    """
    Input: paragraph
    Output: paragraph
    """
    prompt = prompt_list["summarize"]["prefix"] + paragraph + prompt_list["summarize"]["suffix"]
    response = complete(prompt)
    return response

def conditonal_summarize_paragraph(topics: list, paragraph: str) -> str:
    """
    Input: topics, paragraph
    Output: paragraph
    """
    prompt = complete_prompt.prompt_conditional_summary(topics, paragraph)
    response = complete(prompt)
    return response

def expand_topics_from_clue(topics: list, paragraph: str, clue: str) -> str:
    """
    Input: topics, paragraph, clue
    Output: paragraph
    """
    prompt = complete_prompt.expand_topics_from_clue(topics, paragraph, clue)
    response = complete(prompt)
    return response

def expand_topics_from_GPT(topics: list, paragraph: str) -> str:
    """
    Input: topics, paragraph
    Output: paragraph
    """
    prompt = complete_prompt.expand_topics_from_GPT(topics, paragraph)
    response = complete(prompt)
    return response

def rephase_document(document: str) -> list:
    """
    Input: document
    Output: list of paragraph
    """
    prompt = prompt_list["rephrase_document"]["prefix"] + document + prompt_list["rephrase_document"]["suffix"]
    response = json.loads(complete(prompt).replace('\n','')) # remove newline character

    return response

def processing_document(document: str) -> list:
    """
    Input: document
    Output: list of list sentences
    """
    document = document.replace('\n', ' ') # remove newline character
    paragraphs = split_document(document)
    result = ""
    for paragraph in paragraphs:
        result += processing_paragraph(paragraph) + ' '
    
    paragraphs = rephase_document(result)
    
    data = []
    for paragraph in paragraphs:
        data.append(paragraph_to_sentence(paragraph))

    return data

def processing_paragraph(paragraph: str) -> str:
    """
    Input: paragraph
    Output: paragraph (summarized)
    """
    topics = extract_topic(paragraph)
    
    for topic in topics:
        if(RedisDatabase.query_topic(topic) == None):
            topics.remove(topic)

    if(len(topics) == 0):
        return summarize_paragraph(paragraph)
    else:
        return conditonal_summarize_paragraph(topics, paragraph)

def paragraph_to_sentence(paragraph: str) -> list:
    """
    Input: paragraph
    Output: list of sentences
    """
    sentences = paragraph.split('.')
    return sentences

def user_click_sentence(data: list, sentence: str) -> str:
    """
    """
    for paragraph in data:
        for s in paragraph:
            if(s == sentence):
                new_paragraph = ""
                topics = extract_topic(s)
                # check if the sentence is in redis database
                query = RedisDatabase.query_sentence(s)
                if(query == None):
                    new_paragraph =  expand_topics_from_GPT(topics, paragraph)
                else:
                    new_paragraph =  expand_topics_from_clue(topics, query, s)

                new_paragraph = paragraph_to_sentence(new_paragraph)
                # update the paragraph
                paragraph = new_paragraph
                # insert each topic to redis database
                for topic in topics:
                    RedisDatabase.insert_topic(topic, paragraph)
    
    return data


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