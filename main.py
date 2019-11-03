from flask import Flask, render_template
app = Flask(__name__)
from haiku import haiku
from flask import request
from github_scrape import scrape_github_file
from util import prepare_response
@app.route("/")
def hello():
  return render_template('./index.html')


@app.route("/haiku/github/")
def get_github_haiku():
    url = request.args.get('url')
    code = scrape_github_file(url)
    code_haiku = haiku(code)
    return prepare_response(code_haiku)

@app.route("/haiku/text/")
def get_text_haiku():
    code = request.args.get('text')
    code_haiku = haiku(code)
    return prepare_response(code_haiku)

@app.route("/github/")
def get_original_github():
    url = request.args.get('url')
    code = scrape_github_file(url,False)
    return prepare_response(code)


if __name__ == "__main__":
  app.run()
