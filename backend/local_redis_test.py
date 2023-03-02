#%%
import os
import openai
import numpy as np
from redis import Redis
from redis.commands.search.field import VectorField, TagField, NumericField
from redis.commands.search.query import Query
from dotenv import load_dotenv
load_dotenv('./key.env.local')

openai.api_key = os.environ["OPENAI_API_KEY"]
host = "127.0.0.1"
port = 6379
r = Redis(host = host, port = port)
INDEX_NAME = "VNU-HCMUS-free-db"

n_vec = 10000
dim = 1536
vector_field_name = "vector"
rating_field_name = "rating"

k = 10

documents = [    
    "The quick brown fox jumps over the lazy dog. A dog is a man's best friend.",    
    "The lazy dog slept in the sun.",    
    "The quick brown fox ate the lazy dog."]

def delete_data(client: Redis):
    client.flushall()


def create_index():
    schema = (VectorField(vector_field_name, "HNSW", {"TYPE": "FLOAT32", "DIM": dim, "DISTANCE_METRIC": "COSINE"}))
    r.ft(INDEX_NAME).create_index(schema)

# Define a function to generate GPT-3 embeddings
def get_embedding(text, model="text-embedding-ada-002"):
   text = text.replace("\n", " ")
   return openai.Embedding.create(input = [text], model=model)['data'][0]['embedding']

    
def add_to_db(key : str, text : str):
    r.hset(key, mapping= {vector_field_name : np.array(get_embedding(text=text)[:dim], dtype=np.float32).tobytes(),
                          rating_field_name: 10.0})

# Generate embeddings for all documents in the corpus
def test_input():

    for i, document in enumerate(documents):
        key =f'{i}'
        add_to_db(key, document)

#%%

def search(query: str, k: int = 5):
    embedding = get_embedding(text = query)
    query_vector = np.array(embedding[:dim], dtype=np.float32).tobytes()
    
    # Prepare the Query
    base_query = f'*=>[KNN {k} @{vector_field_name} $query]'
    query = Query(base_query).sort_by(vector_field_name).dialect(2)
    params_dict = {"query": query_vector}
    # Vector Search in Redis
    results = r.ft(index_name= INDEX_NAME).search(query, query_params = params_dict)
    return results

#%%
delete_data(r)
#%%
create_index()
#%%
test_input()
# %%

data = search("Can huamn and dog live together ?",1)

ids = [int(item.id) for item in data.docs]

[print(documents[id]) for id in ids]

print(data)

# %%
