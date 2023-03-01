import os
import openai
import json
from dotenv import load_dotenv
from redis_test import *
load_dotenv('./key.env')

OPENAI_EMBEDDINGS_ENGINE = "text-embedding-ada-002"
OPENAI_COMPLETIONS_ENGINE = "text-davinci-003"
MAX_TOKENS = 2000
TEMPERATURE = 0

# load prompt from json file
prompt_list

def __init__():
    prompt_list = json.load("./prompt.json")
    openai.api_key = os.environ.get('openai_api_key')

def interact_gpt(prompt, max_tokens: int = MAX_TOKENS):
    response = openai.Completion.create(
        engine = OPENAI_COMPLETIONS_ENGINE,
        prompt = prompt,
        max_tokens = max_tokens,
        n = 1,
        stop = None,
        temperature = TEMPERATURE,
    )
    return response    

def split_paragraph(paragraph: str, max_tokens: int = MAX_TOKENS):
    prompt = "Chunk the context to 3 - 5 paragraphs. Show exactly the paragraphs without modification, return the answer using this format {'chunk a','chunk b','chunk c'}\n" + str + "Result:\n"
    response = interact_gpt(prompt, max_tokens)
    return response.choices[0].text.strip()

# def paraphrase_paragraph(paragraph: str, max_tokens: int = MAX_TOKENS) -> str:
#     prompt = "paraphrase the following paragraph by these requirement :\n\n" + paragraph + "\n\n1."
#     response = openai.Completion.create(
#         engine="text-davinci-003",
#         prompt=prompt,
#         max_tokens=max_tokens,
#         n=1,
#         stop=None,
#         temperature=TEMPERATURE,
#     )
#     return response.choices[0].text.strip()

"""
def paraphrase_paragraph(extracted-topic):
    - summarize the paragraph: summarize_paragraph()
    - for each topic in extracted-topic:
        if topic is not in redis database: skip
        if topic is in redis database:
            - searching for the raw text of the topic: search_topic()
            if the raw text is found:
                - paraphrase the raw text: paraphrase_text() //cần prompt
            if the raw text is not found:
                - generate context for the topic: generate_context() //cần prompt
                - paraphrase the context: paraphrase_text() 

            - insert the paraphrased text into the paragraph: insert_paragraph()
    
    - paraphrase hole paragraph
    - return the paragraph
"""


def generate_context_from_raw(target_paragraph : str):
    
    related_information = search(target_paragraph, k = 1, search_by_field=sentence_vector_field)
    prompt = "Rewrite the following context \n"
    
    topics = extract_topic(target_paragraph)

    for topic in topics:
        if(query_topic(topic) == None):
            continue
        prompt += '- keep information related to' + topic + '\n'

    prompt += '- keep the structure of the context\n'

    prompt += '- summary unrelated content using words in the context\n\n'

    prompt += 'context\n'


    paragraph_keys = [info.metadata for info in related_information.docs]

    paragraphs = [search(key, search_by_field=paragraph_vector_field).docs[0].metadata for key in paragraph_keys]

    context = ""

    for paragraph in paragraphs:
        context += paragraph + '\n'

    prompt += context

    prompt += "Result:"

    response = interact_gpt(prompt, max_tokens = MAX_TOKENS)

    return response.choices[0].text.strip()




def extract_topic(paragraph: str, max_tokens: int = MAX_TOKENS) -> list:
    prompt = prompt_list["extract_topic"]["prefix"] + paragraph + prompt_list["extract_topic"]["suffix"]
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=max_tokens,
        n=1,
        stop=None,
        temperature=TEMPERATURE,
    )
    return response.choices[0].text.strip()

"""
    - Split the document into paragraphs: split_paragraph()
for each paragraph in the document:
    - extract the topic of the paragraph: extract_topic()
    - paraphrase the paragraph: paraphrase_paragraph(extract_topic)

"""

# f = open("doc.txt", "r", encoding="utf-8")
# text = f.read()
# f.close()

# paragraphs = split_paragraph(text).split("\n\n")
# # print(paragraphs)

# # for i in range(len(paragraphs)):
# #     paragraphs[i] = paraphrase_paragraph(paragraphs[i])

# print(paragraphs)


""" Redis query
insert_topic(topic) -> 1: success, 0: fail
query_topic(topic, threshold = 0.9) -> 1: found, 0: not found

insert_paragraph(paragraph) -> 1: success, 0: fail
query_paragraph(sentence, threshold = 0.9) -> str: paragraph, None: not found

"""