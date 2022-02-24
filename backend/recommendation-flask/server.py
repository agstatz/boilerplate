# Flask server for recommendation system

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# goal is to make this /recommendations/username/food
# and /recommendations/username/dining_courts
@app.route("/recommendations/food", methods=['GET'])
def foodReq():
    return {"members": ["member1", "member2", "member3"]}


if __name__ == "__main__":
    app.run(debug=True)