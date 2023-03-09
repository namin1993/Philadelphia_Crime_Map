# Import Dependencies
from flask import Flask, render_template, redirect, url_for
from pymongo import MongoClient
import pandas as pd
import json
import plotly
import plotly.express as px
import datetime as dt

app = Flask(__name__)

# Depict crime data for the years 2021-2022
@app.route("/")
def index():
    return render_template("map.html")

# Depict crime data for just the year 2021
@app.route("/2021-data")
def map_2021():
    return render_template("map_2021.html")

# Depict crime data for just the year 2022
@app.route("/2022-data")
def map_2022():
    return render_template("map_2022.html")

if __name__ == "__main__":
   app.run(host='localhost', port=5000)

