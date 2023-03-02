from models import ModelInteraction, DocumentInteraction
from crawl_data import crawl_url

from flask import Flask,request
import os
import json
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv('./key.env.local')

documentInteraction = DocumentInteraction()

app = Flask(__name__)
CORS(app)

@app.route("/")
async def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/api/wiki_retrieve/', methods=['POST'])
def listen_url():
    url = request.json['url']
    documentInteraction.insert_document(crawl_url(url))
    documentInteraction.processing_document()
    payload = documentInteraction.get_data()
    print(payload)
    # payload = [["AI is used to show intelligence in activities such as speech recognition, computer vision, and language translation"], ["Examples of AI applications include web search engines (Google Search), recommendation systems (YouTube, Amazon, Netflix), understanding human speech (Siri, Alexa), self-driving cars (Waymo), generative or creative tools (ChatGPT, AI art), automated decision-making and strategic game systems (chess, Go)"], ["AI is used in a wide range of topics and activities"]]
    response = {
        "payload" : json.dumps(payload)
    }
    return response
    

@app.route('/api/user_interact/', methods=['POST'])
def listen_user():
    sentence = request.json['sentence']
    prompt = request.json['prompt']
    if (prompt == "Explain more about this"):
        payload = documentInteraction.user_click_sentence_expand(sentence)
    if (prompt == "Show me the references"):
        payload = documentInteraction.user_click_sentence_get_ref(sentence)

    print(payload)
    response = {
        "payload" : json.dumps(payload)
    }
    return response


if __name__ == '__main__':
    app.run(debug=True)


