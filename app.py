from flask import Flask, render_template, make_response, redirect
from flask_socketio import SocketIO, send, emit
import csv
import itertools

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
def index():
    return 'Welcome to Fundamentals of Computer Science'

@app.route('/basic')
def display_data():
    with open('static/data/Kaggle_TwitterUSAirlineSentiment.csv', encoding='utf-8-sig') as csv_file:
        data = csv.reader(csv_file, delimiter=',')
        first_line = True
        tweetData = []

        for row in itertools.islice(data, 41):
            if not first_line:
                tweetData.append({
                    "id": row[0],
                    "airline_sentiment": row[1],
                    "airline_sentiment_confidence": row[2],
                    "negative_reason": row[3],
                    "airline": row[4],
                    "name": row[5],
                    "text": row[6],
                    "tweet_created": row[7],
                    "tweet_location": row[8]
                })
            else:
                first_line = False
        # sort tweet data using built in sort()
        # this sorts the 40 rows after they have been selected
        tweetData.sort(key=lambda x: x['airline_sentiment_confidence'])
    return render_template("basic.html", tweetData=tweetData)

@app.route('/advanced')
def display_data_d3():
    return render_template("advanced.html")

@app.route('/creative')
def display_visuals_d3():
    return render_template("creative.html")

@app.route('/chat')
def display_visuals_d3():
    return render_template("chat.html")

@socketio.on("message")
def handleMessage(data):
    emit("new_message",data,broadcast=True)
