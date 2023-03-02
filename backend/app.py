from flask import Flask,request
from ModelInteration import ModelInteraction
import os
import json
from flask_cors import CORS
from dotenv import load_dotenv

host = "localhost"
port = 6379

model = ModelInteraction()

model.connect_database(host, port)

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route('/api/predict', methods=['POST'])
def predict():
    query = request.json.get("query")
    query_with_contexts = retrieve_from_gpt(query)
    print(query_with_contexts)
    bot = complete(query_with_contexts)

    return {"bot": bot}
    
if __name__ == '__main__':
    app.run(debug=True)


