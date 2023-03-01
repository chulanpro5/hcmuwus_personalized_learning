#%%
import openai
import numpy as np
from redis import Redis
from redis.commands.search.field import VectorField, TagField, NumericField
from redis.commands.search.query import Query

# Initialize OpenAI API with your API key
openai.api_key = "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"
host = "redis-19948.c302.asia-northeast1-1.gce.cloud.redislabs.com"
port = 19948
password = "q3YBUcKxlyppDWTJXnsUDmWVt6rzLOZY"
r = Redis(host = host, port = port, password = password)
INDEX_NAME = "VNU-HCMUS-free-db"

n_vec = 10000
dim = 1536
dim = 384

vector_field_name = "vector"
rating_field_name = "rating"

k = 10

documents = [    
    "The quick brown fox jumps over the lazy dog.",
    "A dog is a man's best friend.",    
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

data = search("man's friend",2)

ids = [int(item.id) for item in data.docs]

[print(documents[id]) for id in ids]

# Output: ['The lazy dog slept in the sun.', 'The quick brown fox jumps over the lazy dog.', 'The quick brown fox ate the lazy dog.']

#print(search("man's best friend"))
# Output: ["A dog is a man's best friend."]


#%%

# print("Index size: ", r.ft(INDEX_NAME).info()['num_docs'])




#%%


# def load_data(client : Redis, n, d):
#     for i in range(1, n+1):
#         np_vector = np.random.rand(1, d).astype(np.float32)
#         client.hset(i, mapping = {vector_field_name: np_vector.tobytes(),
#                                     rating_field_name: 10*(i/n)})  # ratings ranges from 0-10, proportional to the id)
        

    
# def print_results(res):
#     docs = [int(doc.id) for doc in res.docs]
#     dists = [float(doc.dist) if hasattr(doc, 'dist') else '-' for doc in res.docs]
#     print(f"got {len(docs)} doc ids: ", docs)
#     print("\ndistances: ", dists)



#%%
# Build index - use FLAT vector index


# r.ft().config_set("default_dialect", 2)

# load vectors with meta-data
# np.random.seed(42)
# load_data(r, n_vec, dim)

# print("Index size: ", r.ft().info()['num_docs'])

# query_vector = np.random.rand(1, dim).astype(np.float32)  # This is my query vector

# #%%


# # Give me the top 10 docs with vectors similar to mine
# query_vector = np.random.rand(1, dim).astype(np.float32)
# q = Query(f'*=>[KNN 10 @{vector_field_name} $vec_param]=>{{$yield_distance_as: dist}}').sort_by(f'dist')
# res = r.ft().search(q, query_params = {'vec_param': query_vector.tobytes()})

# print_results(res)
# # print_results(res)


# # %%
# delete_data(r)
# # %%
# schema = (VectorField("v", "HNSW", {"TYPE": "FLOAT32", "DIM": dim, "DISTANCE_METRIC": "COSINE"}),)
# r.ft().create_index(schema)

# r.hset("a", mapping= {"v": np.array(get_embedding(text=documents[0])[:dim], dtype=np.float32).tobytes()})
# r.hset("b", mapping= {"v": np.array(get_embedding(text=documents[1])[:dim], dtype=np.float32).tobytes()})
# r.hset("c", mapping= {"v": np.array(get_embedding(text=documents[2])[:dim], dtype=np.float32).tobytes()})
# #%%
# q = Query("*=>[KNN 2 @v $vec]").return_field("__v_score").dialect(2)
# r.ft("idx").search(q, query_params={"vec": np.array(get_embedding(text=documents[0])[:dim], dtype=np.float32).tobytes()})
# # %%


# print(len(get_embedding(text=documents[0])))

# %%

