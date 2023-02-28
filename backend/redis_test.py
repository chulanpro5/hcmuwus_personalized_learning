documents = [    "The quick brown fox jumps over the lazy dog.",    "A dog is a man's best friend.",    "The lazy dog slept in the sun.",    "The quick brown fox ate the lazy dog."]

import openai
import numpy as np
from redis import Redis
from redis.commands.search.field import VectorField, TagField, NumericField
from redis.commands.search.query import Query

# Initialize OpenAI API with your API key
openai.api_key = "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"

# Define a function to generate GPT-3 embeddings
def get_embedding(text, model="text-embedding-ada-002"):
   text = text.replace("\n", " ")
   return openai.Embedding.create(input = [text], model=model)['data'][0]['embedding']

    
# Generate embeddings for all documents in the corpus
embeddings = {}
for i, document in enumerate(documents):
    embeddings[i] = get_embedding(document)

# Initialize Redis client
host = "redis-19948.c302.asia-northeast1-1.gce.cloud.redislabs.com"
port = 19948
password = "q3YBUcKxlyppDWTJXnsUDmWVt6rzLOZY"
r = Redis(host = host, port = port, password = password)

# Store embeddings in Redis
# for i, embedding in embeddings.items():
#     # print(str(i) + ": " + str(embedding[:10]))
#     embedding = np.array(embedding, dtype=np.float64)
#     print(embedding.tobytes())
#     r.set(str(i), embedding.tobytes())

INDEX_NAME = "VNU-HCMUS-free-db"
def search(query: str, k: int = 5):
    embedding = get_embedding(query)
    query_vector = embedding
    
    # Prepare the Query
    base_query = f'*=>[KNN {k} @embedding $vector AS vector_score]'
    query = (
        Query(base_query)
         .sort_by("vector_score")
         .paging(0, k)
         .dialect(2)
    )
    params_dict = {"vector": np.array(query_vector, dtype=np.float64).tobytes()}
    # Vector Search in Redis
    results = Redis.ft(INDEX_NAME).search(query, params_dict)
    return results



print(search("lazy dog"))
# Output: ['The lazy dog slept in the sun.', 'The quick brown fox jumps over the lazy dog.', 'The quick brown fox ate the lazy dog.']

print(search("man's best friend"))
# Output: ["A dog is a man's best friend."]
