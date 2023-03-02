#%%
from ModelInteration import ModelInteraction

host = "localhost"
port = 6379

paragraphs = {
    'par1' : "Marvel counts among its characters such well-known superheroes as Spider-Man, Iron Man, Captain America, Thor, Doctor Strange, Hulk, Wolverine, and Captain Marvel, as well as popular superhero teams such as the Avengers, X-Men, Fantastic Four, and Guardians of the Galaxy. Its stable of well-known supervillains includes the likes of Doctor Doom, Magneto, Ultron, Thanos, Green Goblin, Galactus, Loki, and Kingpin. Most of Marvel's fictional characters operate in a single reality known as the Marvel Universe, with most locations mirroring real-life places; many major characters are based in New York City, New York, United States.[4] Additionally, Marvel has published several licensed properties from other companies. This includes Star Wars comics twice from 1977 to 1986 and again since 2015.",
    'par2' : r'Marvel is home to iconic superheroes such as Spider-Man, Iron Man, Captain America, Thor, Doctor Strange, Hulk, Wolverine, and Captain Marvel, as well as teams like the Avengers, X-Men, Fantastic Four, and Guardians of the Galaxy. Its roster of supervillains includes Doctor Doom, Magneto, Ultron, Thanos, Green Goblin, Galactus, Loki, and Kingpin. Spiderman is a young boy who has the ability of spider. He can jump and travel through the city easily. However, X-mens are more fancy, they have many wonderful ability that may destroy enemies at once.  Most of Marvel\'s characters inhabit the Marvel Universe, with many based in New York City. Marvel has also published licensed properties from other companies, such as Star Wars comics.'
    }

modelInteraction = ModelInteraction()

modelInteraction.connect_database(host, port)

modelInteraction.redisDatabase.delete_data()

modelInteraction.redisDatabase.create_index()
# %%

#%%

print(modelInteraction.redisDatabase.insert_paragraph('par2', paragraphs['par2']))
# %%
# %%
sentences = paragraphs['par2'].split('.')
# %%
print(sentences[-1])
# %%
print(modelInteraction.redisDatabase.debug_get_paragraph_key(paragraph=paragraphs['par1']).docs[0].metadata)

#%%
#print(modelInteraction.redisDatabase.query_paragraph_key_from_sentence(target_sentece))
# %%
#modelInteraction.redisDatabase.insert_topic('nice nice')
#%%
print(modelInteraction.redisDatabase.insert_topic('X-Men'))
# # %%
# print(modelInteraction.redisDatabase.debug_query_topic('computer science'))
# %%
text = 'Captain Marvel, as well as popular superhero teams such as the Avengers, X-Men, Fantastic Four, and Guardians of the Galaxy.'


# %%
modelInteraction.generate_context_from_raw(text)
# %%
