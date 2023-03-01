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
prompt_list = json.load("./prompt.json")

openai.api_key = os.environ.get('openai_api_key')

def split_paragraph(paragraph: str, max_tokens: int = MAX_TOKENS):
    prompt = "Chunk the context to 3 - 5 paragraphs. Show exactly the paragraphs without modification, return the answer using this format {'chunk a','chunk b','chunk c'}\n" + str + "Result:\n"
    response = openai.Completion.create(
        engine = OPENAI_COMPLETIONS_ENGINE,
        prompt = prompt,
        max_tokens = max_tokens,
        n = 1,
        stop = None,
        temperature = TEMPERATURE,
    )
    return response.choices[0].text.strip()

def paraphrase_paragraph(paragraph: str, max_tokens: int = MAX_TOKENS) -> str:
    prompt = "paraphrase the following paragraph by these requirement :\n\n" + paragraph + "\n\n1."
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=max_tokens,
        n=1,
        stop=None,
        temperature=TEMPERATURE,
    )
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

f = open("doc.txt", "r", encoding="utf-8")
text = f.read()
f.close()

paragraphs = split_paragraph(text).split("\n\n")
# print(paragraphs)

for i in range(len(paragraphs)):
    paragraphs[i] = paraphrase_paragraph(paragraphs[i])

print(paragraphs)