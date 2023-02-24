import os
import openai
from dotenv import load_dotenv
load_dotenv('./key.env')

openai.api_key = os.environ.get('openai_api_key')

def split_paragraph(paragraph, max_tokens=1600):
    prompt = "organize the text into separate paragraphs (about 200 - 300 words) that each convey a distinct main idea:\n\n" + paragraph + "\n\n1."
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=max_tokens,
        n=1,
        stop=None,
        temperature=0.7,
    )
    return response.choices[0].text.strip()

def paraphrase_paragraph(paragraph, max_tokens=1600):
    prompt = "paraphrase the following paragraph by these requirement :\n\n" + paragraph + "\n\n1."
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=max_tokens,
        n=1,
        stop=None,
        temperature=0.7,
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