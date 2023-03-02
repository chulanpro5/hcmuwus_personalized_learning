import os
import json

def save_to_json(data, filename: str) -> None:
    """
    Input: data, filename
    Output: None
    """
    with open(filename, 'w') as file:
        json.dump(data, file)