#%%
import redis
from redis.commands.search.field import VectorField
from redis.commands.search.query import Query

r = redis.Redis(host='localhost', port=6379)

#delete all data
r.flushall()

schema = (VectorField("v", "HNSW", {"TYPE": "FLOAT32", "DIM": 2, "DISTANCE_METRIC": "L2"}),
          VectorField("v2", "HNSW", {"TYPE": "FLOAT32", "DIM": 2, "DISTANCE_METRIC": "L2"}))
r.ft().create_index(schema)

# r.hset("a", mapping={"v": "aaaaaaaa", 'v2': "ab"})
# r.hset("b", mapping={"v": "aaaabaaa", 'v2': "ab"})
# r.hset("c", mapping={"v": "aaaaabaa", 'v2': 'ba'})

r.hset("a", mapping={"v2": "aaaaaaaa"})
r.hset("b", mapping={"v": "aaaabaaa"})
r.hset("c", mapping={"v": "aaaaabaa"})

q = Query("*=>[KNN 3 @v2 $vec]").dialect(2)
r.ft().search(q, query_params={"vec": "aaaaaaaa"})
# %%
