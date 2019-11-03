import re
from syllables import syllable_num, get_syllable_list
from github_scrape import scrape_github_file

haiku_pattern = [5,7,5]
left_chars = ['(', '[']
right_chars = [';', ',', ')', ']']

def load_js_file(file_name):
    with open('./{}.js'.format(file_name)) as html_file:
        return html_file.read()


def remove_extraneous_symbols(input_text):
    regex = r"[.,\/#!$%\^&\*\"\';:{}=\-_`~()+-><]"
    result = re.sub(regex, ' ', input_text)
    return result


def split_by_extraneous_symbols(input_text):
    regex = r"([.,\/#!$%\^&\*\"\';:{}=\-`~()+-><])"
    result = re.split(regex, input_text)
    return result

def split_up_camel(words_string):
    return re.sub('([a-z])([A-Z])', r'\1 \2', words_string)

def get_all_list(input_text):
    all_list = split_by_extraneous_symbols(input_text)
    all_list = ' '.join(all_list).split(' ')
    all_list = list(map(lambda symbol: symbol.strip(),all_list))
    all_list = list(filter(lambda symbol: symbol, all_list))
    return all_list

# def get_word_list(input_text):
#     words_string = remove_extraneous_symbols(input_text)
#     words_string = split_up_camel(words_string)
#     word_list = words_string.split(' ')
#     word_list = list(map(lambda word: word.strip().lower(), word_list))
#     word_list = list(filter(lambda word: word, word_list))
#     return word_list

def syllable_map(word_list):
    return {word: syllable_num(word) for word in word_list}


def remove_used_words(word_list,words):
    for word in words:
        word_list.remove(word)
    return word_list

def build_haiku_from_map(word_list, syl_map):
    haiku = []
    for syl_per_line in haiku_pattern:
        line = []
        looked_words = []
        line_count = 0
        for word in word_list:
            looked_words.append(word)
            num_syl = syl_map[word]
            if num_syl > 0:
                if num_syl+line_count <= syl_per_line:
                    line.append(word)
                    line_count += num_syl
                else:
                    # if we're here, the whole word wouldn't fit at the end of the line
                    
                if line_count == syl_per_line:
                    break
            else:
                line.append(word)
        word_list = remove_used_words(word_list, looked_words)
        haiku.append(line)
    return list(map(lambda line: ' '.join(line),haiku))

def print_haiku(haiku):
    # added extra formatting so that we only add spaces where it makes sense
    # we want (input, seeds, dude) instead of ( input , seeds , dude )
    for line in haiku:
        for i in range(len(line)):
            word = line[i]
            end_char = ' '
            if word in left_chars:
                end_char = ''
            elif i + 1 < len(line) and line[i + 1] in right_chars:
                end_char = ''

            print(word, end=end_char)
        print("")


def haiku(input_text):
    # first got to remove all delimiters and punctuation
    # then, need to make a list of keywords, numbers, assignments, etc
    # then, feed into haiku generation engine
    # then send to front-end ui
    all_list = get_all_list(input_text)
    syl_map = syllable_map(all_list)
    haiku = build_haiku_from_map(all_list, syl_map)
    return haiku


if __name__ == '__main__':
    input_text = load_js_file('code')
    # get_all_list(input_text)
    haiku(input_text)
