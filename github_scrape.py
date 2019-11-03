import requests
import re
from bs4 import BeautifulSoup


def validate_github_url(url):
    regex = r"^https:\/\/github.com\/(.+).js$"
    return bool(re.search(regex,url))


def scrape_github_file(url, clean_up=True):
    if validate_github_url(url):
        page = get_souped_page_from_url(url)
        code = page.select('table')
        code_string = get_code_as_string(code, clean_up)
        return code_string
    else:
        raise ValueError

# clean up the item text, by removing the bracket text and the random new line characters
def clean_up_item(item):
    item = item.replace("\n\n", "  ") # replace the double new lines with double space for language maps
    item = ' '.join(item.split())
    return item




def get_code_as_string(code, clean_up):
    uncleaned = ''.join(extract_text_from_tag_array(code));
    if clean_up:
        return clean_up_item(uncleaned)
    return re.sub(r'\n+', '\n', uncleaned).strip()

# build a url based on the ethnologue base, and return the "souped" i.e wrapped html string response of the page
def get_souped_page_from_url(full_url):
    page_string = get_page_as_string(full_url)
    return BeautifulSoup(page_string, "html.parser")

# get the page html as a string
def get_page_as_string(link):
    response = requests.get(link)
    return response.content

# given an array of beautifulsoup tags, return a list of all the texts of all the tags
def extract_text_from_tag_array(tags):
    return list(map(lambda x: x.text.strip(), tags))


if __name__ == '__main__':
    url = 'https://github.com/sghsri/js_haiku/blob/master/code.js'
    code = scrape_github_file(url)
    print(code)
