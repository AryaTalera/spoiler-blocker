from flask import Flask, request, jsonify
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Welcome to the Spoiler Detection API!"  # Simple welcome message for testing

@app.route('/check-spoiler', methods=['POST'])
def check_spoiler():
    data = request.json
    text = data['text']
    watchlist = data['watchlist']

    # Basic spoiler detection logic
    spoiler_positions = []
    for show in watchlist:
        if show.lower() in text.lower():
            # Simple logic: if the show name is found in the text, we mark it as a spoiler
            # In a real application, you would use a more sophisticated approach.
            spoiler_positions.append({
                "left": 150,  # Placeholder values
                "top": 40,
                "width": 200,
                "height": 50
            })

    return jsonify({
        "isSpoiler": len(spoiler_positions) > 0,
        "spoilerPositions": spoiler_positions
    })

if __name__ == "__main__":
    app.run(debug=True)
