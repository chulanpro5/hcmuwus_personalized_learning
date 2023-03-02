from bs4 import *
import requests
import string
import re

# MAX_CHAR = 8000
MAX_CHAR = 500

def crawl_url(url: str) -> str:
    url = url
    r = requests.get(url)
    soup = BeautifulSoup(r.text,'html.parser').select('body')[0]

    # Initialize variable
    paragraphs = []
    images = []
    # link = []
    # heading = []
    # remaining_content = []

    char_cnt = 0
    # Iterate through all tags
    for tag in soup.find_all():
        if char_cnt > MAX_CHAR: break
        # For Paragraph use p tag
        if tag.name=="p":
            # use text for fetch the content inside p tag
            paragraphs.append(tag.text)
            char_cnt += len(tag.text)
            
        # For Image use img tag
        elif tag.name=="img":
            # Add url and Image source URL
            images.append(url+tag['src'])

    # print(paragraphs, images, link, heading, remaining_content)
    # remove unread unicode characters
    paragraphs = [paragraph.encode('utf-8', 'ignore').decode('utf-8') for paragraph in paragraphs]
    
    # flatten paragraphs to a single string
    result = ""
    for paragraph in paragraphs:
        result += paragraph
    # print(result)

    result = result.replace('"', '\'').replace("\n", " ")
    result = ''.join(filter(lambda x: x in string.printable, result))
    result = re.sub(r'\[[0-9]+\]',r'', result)

    print(result)
    
    return result
if __name__ == "__main__":
    crawl_url("https://en.wikipedia.org/wiki/Artificial_intelligence")