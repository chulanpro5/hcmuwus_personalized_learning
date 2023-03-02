#%%
import openai
import numpy as np
from redis import Redis
from redis.commands.search.field import VectorField, TagField, NumericField
from redis.commands.search.query import Query

openai.api_key = "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"
host = "redis-19948.c302.asia-northeast1-1.gce.cloud.redislabs.com"
port = 19948
password = "q3YBUcKxlyppDWTJXnsUDmWVt6rzLOZY"
INDEX_NAME = "hcmuwus-db"

n_vec = 10000
dim = 1536
dim = 384
k = 10

sentence_vector_field = "sentence_vector"
paragraph_vector_field = "paragraph_vector"
topic_vector_field = "topic_vector"

vector_field_name = "vector"
rating_field_name = "rating"

documents = [    
    "The quick brown fox jumps over the lazy dog. A dog is a man's best friend.",    
    "The lazy dog slept in the sun.",    
    "The quick brown fox ate the lazy dog."]

class RedisDatabase():

    # Initialize OpenAI API with your API key

    def __init__(self, host, port, password):
        self.host = host
        self.port = port
        self.password = password
        
        self.r = Redis(host = host, port = port, password = password)

    def connect_host(self, host, port, password):
        self.r = Redis(host = host, port = port, password = password)
        return self.r

    def delete_data(self, client: Redis):
        client.flushall()


    def create_index(self):
        schema = (VectorField(topic_vector_field, "HNSW", {"TYPE": "FLOAT32", "DIM": dim, "DISTANCE_METRIC": "COSINE"}),
                VectorField(sentence_vector_field, "HNSW", {"TYPE": "FLOAT32", "DIM": dim, "DISTANCE_METRIC": "COSINE"}),
                VectorField(paragraph_vector_field, "HNSW", {"TYPE": "FLOAT32", "DIM": dim, "DISTANCE_METRIC": "COSINE"}))
        self.r.ft(INDEX_NAME).create_index(schema)


    # Define a function to generate GPT-3 embeddings
    def get_embedding(self, text, model="text-embedding-ada-002"):
        text = text.replace("\n", " ")
        return openai.Embedding.create(input = [text], model=model)['data'][0]['embedding']

        
    def add_topic_to_db(self, key : str, text : str):
        self.r.hset(key, mapping= {topic_vector_field : np.array(self.get_embedding(text=text)[:dim], dtype=np.float32).tobytes(),
                            "metadata" : text,
                            rating_field_name: 10.0})

    def get_paragraph_key(self, paragraph):
        embedding = self.get_embedding(paragraph)
        query_vector = np.array(embedding[:dim], dtype=np.float32).tobytes()
        base_query = f'*=>[KNN 1 @{paragraph_vector_field} $query]'

        query = Query(base_query).sort_by(vector_field_name).dialect(2)
        params_dict = {"query": query_vector}
        # Vector Search in Redis
        results = self.r.ft(index_name= INDEX_NAME).search(query, query_params = params_dict)
        if(len(results.docs) == 0):
            return None
        
        value = results.docs[0].metadata
        if(value != paragraph):
            return None
        
        return results.docs[0].id

    def add_paragraph(self, key : str, paragraph : str):
        key = self.get_paragraph_key(paragraph)
        if(key is not None):
            return False
        
        info = {}
        info['metadata'] = paragraph
        embedding = self.get_embedding(paragraph)
        query_vector = np.array(embedding[:dim], dtype=np.float32).tobytes()
        info[sentence_vector_field] = query_vector

        self.r.hset(key, mapping= info)

        return True


    def add_sentence_in_paragraph(self, key : str, paragraph: str):
        sentences = paragraph.split('.')
        #for sentence in paragraph

        key_paragraph = self.get_paragraph_key(paragraph)

        if(key_paragraph is None):
            return 0

        for sentence in sentences:
            info = {}
            info['metadata'] = key_paragraph
            embedding = self.get_embedding(sentence)
            query_vector = np.array(embedding[:dim], dtype=np.float32).tobytes()
            info[sentence_vector_field] = query_vector

            self.r.hset(key, mapping= info)

        return 1


    # Generate embeddings for all documents in the corpus
    def test_input(self):

        for i, document in enumerate(documents):
            key =f'{i}'
            self.add_topic_to_db(key, document)

    #%%

    def search(self, query: str, index_name = INDEX_NAME, k: int = 5, search_by_field : str = vector_field_name):
        embedding = self.get_embedding(text = query)
        query_vector = np.array(embedding[:dim], dtype=np.float32).tobytes()
        
        # Prepare the Query
        base_query = f'*=>[KNN {k} @{search_by_field} $query]'
        query = Query(base_query).sort_by(search_by_field).dialect(2)
        params_dict = {"query": query_vector}
        # Vector Search in Redis
        results = r.ft(index_name = index_name).search(query, query_params = params_dict)
        return results

    def query_topic(self,topic, threshold = 0.9):
        result = self.search(topic, 1, index_name= INDEX_NAME, search_by_field= sentence_vector_field)
        #get score from result
        score = 1 - result.docs[0].__vector_score
        if(score >  threshold):
            return None
        
        #return the name of the topic
        return result.docs[0].metadata

    def insert_topic(self, topic):

        #get score from result
        score = self.query_topic(topic)
        if(score >  0.9):
            return False

        self.add_topic_to_db(topic, topic)
        return True


    def insert_paragraph(self, key : str,  paragraph : str):
        '''
        insert the hole paragraph and each sentence in paragraph
        key_sentence = f'{key}_{idx}'
        '''
        res_add =  self.add_paragraph(key, paragraph)
        if(res_add == 0):
            return None

        sentences = paragraph.split('.')
        for idx, sentence in enumerate(sentences):
            key_sentence = f'{key}_{idx}'
            self.add_sentence_in_paragraph(key_sentence, sentence)

        return key

    def query_paragraph_key_from_sentence(self, sentence : str, threshold : int = 0.9):
        result = self.search(sentence, 1)
        #get score from result
        score = 1 - result.docs[0].__vector_score
        if(score >  threshold):
            return None
        
        # metadata is the key of paragraph
        return result.docs[0].metadata
