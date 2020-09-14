import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session

from sqlalchemy import create_engine, func, inspect

from flask import Flask, jsonify, render_template



###Database Setup###
# Set Connection String
connection_string = "postgres:postgres@localhost:5432/covid_db"

# Set Engine
engine = create_engine(f'postgresql://{connection_string}')



app = Flask(__name__)

##Render the index.html file here
@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/covid")
def covid_data():
    covid = pd.read_sql("SELECT * FROM public.covid", con=engine)
    covid_json = covid.to_dict(orient="records")
    return jsonify(covid_json)


@app.route("/census")
def census_data():
    census = pd.read_sql("SELECT * FROM public.census", con=engine)
    census_json = census.to_dict(orient="records")
    return jsonify(census_json)




if __name__ == "__main__":
    app.run(debug=True)