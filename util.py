from flask import jsonify
import requests
import json




def prepare_response(json_data):
    response = jsonify(json_data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

def make_api_call(api_call):
    response = requests.get(api_call)
    return json.loads(response.text)
