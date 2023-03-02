from flask import Flask,request
import pinecone
import openai 
import os
import json
from flask_cors import CORS
from dotenv import load_dotenv
import textstat
load_dotenv('./key.env')


pinecone_api_key = os.environ.get('pinecone_api_key')
pinecone_env = os.environ.get('pinecone_env')
pinecone_index_name = os.environ.get('pinecone_index_name')
openai.api_key = os.environ.get('openai_api_key')

def embed_text(text):
    model_engine = "text-embedding-ada-002"

    embedding = openai.Embedding.create(
        model= model_engine,
        input= text
    )
    return embedding

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

#co = cohere.Client(cohere_api_key)

index_name = pinecone_index_name
pinecone.init(pinecone_api_key, environment=pinecone_env)
index = pinecone.Index(index_name)


limit = 1600

def get_gpt_embedding(query):
    model_engine = "text-davinci-003"
    embedding = openai.Embedding.create(
        model= model_engine,
        input= query
    )
    return embedding

def retrieve_from_gpt(query):
    xq = get_gpt_embedding(query)
    # search pinecone index for context passage with the answer
    xc = index.query(xq, top_k=3, include_metadata=True)
    contexts = [
        x['metadata']['text'] for x in xc['matches']
    ]

    # build our prompt with the retrieved contexts included
    prompt_start = (
        "Answer the Query based on the contexts, if it's not in the contexts say 'I don't know the answer'. \n\n"+
        "Context:\n"
    )
    prompt_end = (
        f"\n\nQuery: {query}\nAnswer in the language of Query, if Query is in English Answer in English. Please provide reference Quran verses."
    )
    # append contexts until hitting limit
    for i in range(1, len(contexts)):
        if len("\n\n---\n\n".join(contexts[:i])) >= limit:
            prompt = (
                prompt_start +
                "\n\n---\n\n".join(contexts[:i-1]) +
                prompt_end
            )
            break
        elif i == len(contexts)-1:
            prompt = (
                prompt_start +
                "\n\n---\n\n".join(contexts) +
                prompt_end
            )
    return prompt

def complete(prompt):
    # query text-davinci-003
    res = openai.Completion.create(
        engine='text-davinci-003',
        prompt=prompt,
        temperature=0,
        max_tokens=1000,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
        stop=None
    )
    return res['choices'][0]['text'].strip()




def feedback_processing(feedback):
    pass

def update_learning_state_to_database(learning_state : str):
    # Please make an update to pinecone index
    pinecone_index_name = os.environ.get('pinecone_index_name')
    pinecone_api_key = os.environ.get('pinecone_api_key')
    pinecone_env = os.environ.get('pinecone_env')
    pinecone.init(pinecone_api_key, environment=pinecone_env)
    index = pinecone.Index(pinecone_index_name)

    # get the embedding of the learning state
    xq = get_gpt_embedding(learning_state)
    # add the embedding to the pinecone index
    index.upsert(xq, metadata={"text": learning_state}, namespace="learning_state")
    


@app.route('/api/predict', methods=['POST'])
def predict():
    query = request.json.get("query")
    query_with_contexts = retrieve_from_gpt(query)
    print(query_with_contexts)
    bot = complete(query_with_contexts)

    return {"bot": bot}
    
if __name__ == '__main__':
    app.run(debug=True)