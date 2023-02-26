import spacy
nlp = spacy.load('en_core_web_sm')

f = open('./backend/doc1.txt', encoding='utf-8')

text = f.read()

doc = nlp(text)

for ent in doc.ents:
    print(ent.text, ent.start_char, ent.end_char, ent.label_)

sections = {}

for ent in doc.ents:
    if ent.label_ not in sections:
        sections[ent.label_] = [ent.text]
    else:
        sections[ent.label_].append(ent.text)


for section in sections:
    print(section)


sentences = [sent.text for sent in doc.sents]

# Initialize an empty list to hold the paragraphs
paragraphs = []
current_paragraph = []

# Group sentences into paragraphs based on similarity
for i in range(len(sentences)):
    # Add the first sentence to the current paragraph
    if i == 0:
        current_paragraph.append(sentences[i])
    # Compare the current sentence to the previous one
    else:
        similarity = nlp(current_paragraph[-1]).similarity(nlp(sentences[i]))
        # If the sentences are similar, add the current sentence to the current paragraph
        if similarity > 0.5:
            current_paragraph.append(sentences[i])
        # If the sentences are dissimilar, start a new paragraph
        else:
            paragraphs.append(' '.join(current_paragraph))
            current_paragraph = [sentences[i]]
    
# Add the last paragraph to the list
paragraphs.append(' '.join(current_paragraph))

# Print the resulting paragraphs
for i, paragraph in enumerate(paragraphs):
    print(f"Paragraph {i+1}: {paragraph}")

