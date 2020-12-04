from flask import Flask, send_from_directory, render_template
app = Flask(__name__, static_folder='client', static_url_path='')
from haiku import haiku
from flask import request
from github_scrape import scrape_github_file
from util import prepare_response

@app.route("/")
def hello():
  return send_from_directory(app.static_folder, 'index.html')

@app.route("/haiku/github/")
def get_github_haiku():
    url = request.args.get('url')
    code = scrape_github_file(url)
    code_haikus = haiku(code)
    return prepare_response(code_haikus)

@app.route("/haiku/text/")
def get_text_haiku():
    code = request.args.get('text')
    code_haikus = haiku(code)
    return prepare_response(code_haikus)

@app.route("/github/")
def get_original_github():
    url = request.args.get('url')
    code = scrape_github_file(url,False)
    return prepare_response(code)


if __name__ == "__main__":
  app.run()
