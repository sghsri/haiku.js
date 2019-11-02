import re
from syllables import syllable_num

haiku_pattern = [5,7,5]

def load_js_file(file_name):
    with open('./{}.js'.format(file_name)) as html_file:
        return html_file.read()



def remove_extraneous_symbols(input_text):
    regex = r"[.,\/#!$%\^&\*\"\';:{}=\-_`~()+-><]"
    result = re.sub(regex, ' ', input_text)
    return result

def split_up_camel(words_string):
    return re.sub('([a-z])([A-Z])', r'\1 \2', words_string)



def get_word_list(input_text):
    words_string = remove_extraneous_symbols(input_text)
    words_string = split_up_camel(words_string)
    word_list = words_string.split(' ')
    word_list = list(map(lambda word: word.strip(), word_list))
    word_list = list(filter(lambda word: word, word_list))
    return word_list

def syllable_map(word_list):
    return {word: syllable_num(word) for word in word_list}


def build_haiku_from_map(syl_map):
    haiku = []
    for syl_per_line in haiku_pattern:
        line_count = 0



def haiku(input_text):
    # first got to remove all delimites and punctuation
    # then, need to make a list of keywords, numbers, assignments, etc
    # then, feed into haiku generation engine
    # then send to front-end ui
    word_list = get_word_list(input_text)
    syl_map = syllable_map(word_list)
    return syl_map




if __name__ == '__main__':
    input_text = load_js_file('code')
    print(haiku(input_text))
