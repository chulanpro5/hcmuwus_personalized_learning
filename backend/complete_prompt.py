import os
import json

def load_prompt():
    prompt_list =  json.load(open('prompt.json', 'r'))
    return prompt_list

def prompt_conditional_summary(topics: list, paragraph: str) -> str:
    prompt = "Rewrite the following context \n"

    for topic in topics:
        prompt += '- keep information related to' + topic + '\n'
    prompt += '- keep the structure of the context\n'
    prompt += '- summary unrelated content using words in the context\n\n'
    
    prompt += "context:\n"
    prompt += paragraph 
    prompt += '\n'

    prompt += "Result:\n"

    return prompt

def expand_topics_from_clue(topics: list, paragraph: str, clue: str) -> str:
    prompt = "Rewrite the following context \n"
    prompt += "- only use the given information in the clue\n"
    prompt += "- keep the default information of the context\n"

    for topic in topics:
        prompt += '- add the information related to' + topic + '\n'
    
    prompt += "- keep the structure of the context\n"
    prompt += "- do not learn other information in clue\n"
    
    prompt += "clue:\n"
    prompt += clue + "\n"

    prompt += "context:\n"
    prompt += paragraph 
    prompt += '\n'

    prompt += "Result:\n"

    return prompt

def expand_topics_from_GPT(topics: list, paragraph: str) -> str:
    prompt = "Rewrite the following context \n"

    for topic in topics:
        prompt += '- add the information related to' + topic + '\n'
    
    prompt += "- keep the structure of the context\n"
    
    prompt += "context:\n"
    prompt += paragraph 
    prompt += '\n'

    prompt += "Result:\n"

    return prompt

if __name__ == "__main__":
    context = "Context context context context context context context context context context context context context"
    clue = "Clue clue clue clue clue clue clue clue clue clue clue clue"
    topics = ["topic1", "topic2", "topic3"]

    # print(prompt_conditional_summary(topics, context))
    # print(expand_topics_from_clue(topics, context, clue))
    # print(expand_topics_from_GPT(topics, context))

