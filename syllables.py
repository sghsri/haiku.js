from nltk.corpus import cmudict
d = cmudict.dict()
import re

dict_filename = 'cmudict.rep'

def syllable_num(word):
    if is_NOP(word):
        return 0
    try:
        return [len(list(y for y in x if y[-1].isdigit())) for x in d[word.lower()]][0]
    except KeyError:
        return count_syllables_manually(word)

def is_NOP(symbol):
    return bool(re.search(r"[.,\/#!$%\^&\*\"\';:{}=\-_`~()+-><]",symbol))

def is_camel_case(symbol):
    return bool(re.search(r"(?:[A-Z][a-z]+)+",symbol))

def handle_camel_case(symbol):
    words = re.split(r"(?:[A-Z][a-z]+)+",symbol)
    num_syllables = 0
    for word in words:
        num_syllables += syllable_num(word)
    return num_syllables

def is_special(symbol):
    return is_camel_case(symbol)

def count_syllables_manually(word):

    count = 0
    vowels = 'aeiouy'
    word = word.lower()
    if word[0] in vowels:
        count +=1
    for index in range(1,len(word)):
        if word[index] in vowels and word[index-1] not in vowels:
            count +=1
    if word.endswith('e'):
        count -= 1
    if word.endswith('le'):
        count+=1
    if count == 0:
        count +=1
    return count

def get_syllable_list(word):
    # TODO : implement this
    print( syllable_dict['seriously'])

if __name__ == '__main__':
    print(syllable_num('const'))
