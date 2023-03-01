import os
import openai
import json
from dotenv import load_dotenv
load_dotenv('./key.env')

OPENAI_EMBEDDINGS_ENGINE = "text-embedding-ada-002"
OPENAI_COMPLETIONS_ENGINE = "text-davinci-003"
MAX_TOKENS = 1600
TEMPERATURE = 0

# load prompt from json file
with open('prompt.json', 'r') as f:
    prompt_list = json.load(f)

openai.api_key = os.environ.get('openai_api_key')

def complete(prompt: str) -> str:
    response = openai.Completion.create(
        engine = OPENAI_COMPLETIONS_ENGINE,
        prompt = prompt,
        max_tokens = MAX_TOKENS,
        n = 1,
        stop = None,
        temperature = TEMPERATURE,
    )
    return response.choices[0].text.strip()

def split_document(paragraph: str) -> list:
    # print("slit document")
    prompt = prompt_list["split_document"]["prefix"] + paragraph + prompt_list["split_document"]["suffix"]
    response = json.loads(complete(prompt).replace('\n','')) # remove newline character

    return response

def extract_topic(paragraph: str) -> list:
    # print("extract topic")
    prompt = prompt_list["extract_topic"]["prefix"] + paragraph + prompt_list["extract_topic"]["suffix"]
    response = json.loads(complete(prompt))

    return response

def summarize_paragraph(paragraph: str) -> str:
    # print("summarize paragraph")
    prompt = prompt_list["summarize"]["prefix"] + paragraph + prompt_list["summarize"]["suffix"]
    response = json.loads(complete(prompt))[0]
    return response

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
    
    - paraphrase whole paragraph
    - return the paragraph
"""

"""
    - Split the document into paragraphs: split_document()
for each paragraph in the document:
    - extract the topic of the paragraph: extract_topic()
    - paraphrase the paragraph: paraphrase_paragraph(extract_topic)

"""

f = open("wiki_1.txt", "r", encoding="utf-8")
text = f.read()
f.close()

docs = split_document(text)
for doc in docs:
    print(summarize_paragraph(doc))


""" Redis query
insert_topic(topic) -> 1: success, 0: fail
query_topic(topic, threshold = 0.9) -> 1: found, 0: not found

insert_paragraph(paragraph) -> 1: success, 0: fail
query_paragraph(sentence, threshold = 0.9) -> str: paragraph, None: not found

"""