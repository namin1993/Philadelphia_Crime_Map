# Import Dependencies
from flask import Flask, render_template, redirect, url_for
from pymongo import MongoClient
import pandas as pd
import json
import plotly
import plotly.express as px
import datetime as dt
#import db_connections

app = Flask(__name__)
# Shows you what was scraped
@app.route("/")
def index():
    # Find collections
    #news = db_connections.mogodb_client.Final_Project.nyt_api.find()
    #news = news[:4]
    return render_template("index.html")

# Question 1: Which organizations are responsible for the most deaths and injuries from 1972-2022?
'''
@app.route('/chart1/')
def chart1():
    try:
        print("The mongodb connection worked!!")

        # Find collections
        news = db_connections.mogodb_client.Final_Project.nyt_api.find()
        news = news[:4]

        # Read terrorism dataframe
        terrorism_df = pd.DataFrame(list(db_connections.terrorism.find()))
        terrorism_df.drop(['_id'], axis=1, inplace=True)

        # Filter by date
        terrorism_df = terrorism_df[terrorism_df["DATE"] > '1971-12-31']

        # Group by 'PERPETRATOR' and sum up 'DEAD' and 'INJURED' numbers per PERPETRATOR
        q_1df = terrorism_df.groupby(['PERPETRATOR'])[['DEAD', 'INJURED']].sum().reset_index()
        q_1df['DEAD_AND_INJURED'] = q_1df['DEAD'] + q_1df['INJURED']
        q_1df.drop(columns=['DEAD', 'INJURED'], axis=1, inplace=True)

        # Sort values
        q_1df = q_1df.sort_values(['DEAD_AND_INJURED'], ascending=[False]).reset_index()

        # Create graph
        fig = px.bar(q_1df, x="DEAD_AND_INJURED", y="PERPETRATOR", 
                    color="PERPETRATOR", 
                    orientation='h', 
                    title='Total number of Dead and Injured caused by each Terrorist Group from 1972 - 2022', 
                    height=800)

        graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
        return render_template("index.html", graphJSON=graphJSON, articles=news)

    except Exception as e:
        print(f'{e}')
'''

# Map
'''
@app.route('/map/')
def age_and_gender_map():
    try:
        return render_template("index.html")
    except Exception as e:
        print(f'{e}')
'''

if __name__ == "__main__":
   app.run(host='localhost', port=5000)

