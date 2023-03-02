import textstat
# import redis

def get_metric_vector(context):
    #get value from The Flesch Reading Ease formula
    flesch_reading_ease = textstat.flesch_reading_ease(context)
    #get value from The Flesch-Kincaid Grade Level
    flesch_kincaid_grade = textstat.flesch_kincaid_grade(context)
    #get value from The Gunning Fog Index
    gunning_fog = textstat.gunning_fog(context)
    #get value from The SMOG Index
    smog_index = textstat.smog_index(context)
    #get value from The Automated Readability Index
    automated_readability_index = textstat.automated_readability_index(context)
    #get value from The Coleman-Liau Index
    coleman_liau_index = textstat.coleman_liau_index(context)
    #get value from The Linsear Write Formula
    linsear_write_formula = textstat.linsear_write_formula(context)
    #get value from The Dale-Chall Readability Score
    dale_chall_readability_score = textstat.dale_chall_readability_score(context)
    #get value from The Difficult Words
    difficult_words = textstat.difficult_words(context)
    #get value from The Linsear Write Formula
    linsear_write_formula = textstat.linsear_write_formula(context)
    
    return [flesch_reading_ease, flesch_kincaid_grade, gunning_fog, smog_index, automated_readability_index, coleman_liau_index, linsear_write_formula, dale_chall_readability_score, difficult_words, linsear_write_formula]



#append vector to redis
def append_vector_to_redis(context, vector):
    r = redis.Redis(host='localhost', port=6379, db=0)
    r.set(context, vector)

f = open("doc1.txt", "r", encoding="utf-8")
context = f.read()
ans = get_metric_vector(context)
print(ans)