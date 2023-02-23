from tika import parser # pip install tika

raw = parser.from_file('stages of compilation.pdf')
print(raw['content'])