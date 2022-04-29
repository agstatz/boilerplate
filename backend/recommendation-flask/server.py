# Flask server for recommendation system
# author: Gaurav Manglani

import json
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

    resp = jsonify(random.sample(res.json(), 3))
    resp.headers['Access-Control-Allow-Origin'] = "http://localhost:3000"
    resp.headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept"
    return resp


# @route   GET /recommendations/:username/dining-courts/
# @desc    Returns a list of recommended dining courts for the user
# @access  Public
@app.route('/recommendations/<string:username>/dining-courts/', methods=['GET'])
def diningReq(username):
    res = requests.get('http://localhost:3001/api/dining-locations/')

    if res.status_code != 200:
        return res.content, res.status_code

    resp = jsonify(random.sample(res.json(), 3))
    resp.headers['Access-Control-Allow-Origin'] = "http://localhost:3000"
    resp.headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept"
    return resp


# @route   GET /recommendations/:username/foods/
# @desc    Returns a list of recommended foods for the user (max 5)
# @access  Public
@app.route('/recommendations/<string:username>/foods/', methods=['GET'])
def mealReq(username):
    res1 = requests.get('http://localhost:3001/api/foods/')
    if res1.status_code != 200:
        return res1.content, res1.status_code

    res2 = requests.get('http://localhost:3001/api/users/dietary/' + username + '/')
    if res2.status_code != 200:
        return res2.content, res2.status_code

    foods = json.loads(res1.text)
    restrictions = json.loads(res2.text)['restrictions']

    allergen_tag = "62180f57addc01fee8e4fe80" # hard-coded tag for allergen in food_tag_types

    edible_foods = []
    for food in foods:
        if 'dietaryTags' not in food or 'name' not in food:
            continue
        food_dietary_tags = food['dietaryTags']

        for restriction in restrictions:
            if 'tagType' not in restriction or 'name' not in restriction:
                continue
            restriction_name = restriction['name']
            restriction_tag_type = restriction['tagType']

            if (restriction_tag_type == allergen_tag and restriction_name not in food_dietary_tags) or (restriction_tag_type != allergen_tag and restriction_name in food_dietary_tags):
                food_data = {
                    "name": food['name'],
                    "nutrition": 
                        food.get('calories', 'undefined') + " calories,\n"
                        + food.get('totalFat', 'undefined') + " fat,\n"
                        + food.get('totalCarbohydrate', 'undefined') + " carbs,\n"
                        + food.get('protein', 'undefined') + " protein"
                }
                edible_foods.append(food_data)
    
    if len(edible_foods) >= 5:
        num_foods = 5
    else:
        num_foods = len(edible_foods)
    
    resp = jsonify(random.sample(edible_foods, num_foods))
    resp.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
    resp.headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept"
    return resp


if __name__ == "__main__":
    # server will run with debugger active
    # server will reload automatically on code change
    app.run(debug=True, use_reloader=True)