# Flask server for recommendation system
# author: Gaurav Manglani

import random
from flask import Flask, jsonify, request
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# @route   GET /recommendations/:username/food/
# @desc    Returns a list of recommended food items for the user
# @access  Public
@app.route('/recommendations/<string:username>/food/', methods=['GET'])
def foodReq(username):
    res = requests.get('http://localhost:3001/api/foods/')
    
    if res.status_code != 200:
        return res.content, res.status_code

    foods = random.sample(res.json(), 3)
    return jsonify(foods)


# @route   GET /recommendations/:username/dining-courts/
# @desc    Returns a list of recommended dining courts for the user
# @access  Public
@app.route('/recommendations/<string:username>/dining-courts/', methods=['GET'])
def diningReq(username):
    res = requests.get('http://localhost:3001/api/dining-locations/')

    if res.status_code != 200:
        return res.content, res.status_code

    dining_courts = random.sample(res.json(), 3)
    return jsonify(dining_courts)


if __name__ == "__main__":
    # server will run with debugger active
    # server will reload automatically on code change
    app.run(debug=True, use_reloader=True)