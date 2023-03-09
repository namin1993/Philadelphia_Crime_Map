## Philadelphia_Crime_Map

### Table of Contents
* Description
* Installation
* Instructions for use
* Dataset Resources
* Additional features to include
* Notes
* Website

### Description
This webpage displays the relationship between poverty in each Philadelphia block the amount of crime that has taken place betweeen 2021 - 2022, and the price of listed residential properties around the region.

### Installation:
Create a project directory: 
```
mkdir philacrimeapp
```
Change into the project directory
```
cd philacrimeapp
```
When inside of project directory, enter commands in terminal to create virtual environment:<br />
```
python3 -m venv <name_of_virtualenv>
source <name_of_virtualenv>/bin/activate
git init
git pull https://github.com/namin1993/Philadelphia_Crime_Map.git
cd Philadelphia_Crime_Map
pip install requirements.txt
SET FLASK_APP='app.py'
flask run
```

### Instructions for use:
Click on tabs below the map visual for different datasets in 2021, 2022, or combined.
Hover over the map to receive more information in the plot point or district. Select the menu icon on the top corner of the map to filter crime data.

### Additional features to include:
* Tableau visuals on crime data

### Dataset Resources:
Cannot upload full datasets due to files sizes, but sources are listed below:
https://technical.ly/uncategorized/philadelphia-crime-data-api/
https://www.opendataphilly.org/dataset/neighborhood-food-retail
https://www.opendataphilly.org/dataset/certified-for-rental-suitability
https://www.opendataphilly.org/dataset/crime-incidents
https://www.opendataphilly.org/dataset/opa-property-assessments

### Notes
Dataset: Would have preferred API access to phl.carto.com instead of CSV files from opendataphilly.org.
Dataset is large, so it will take a little time for all data to load on the map.

### Website
View application here : http://phillycrime.nehla.codes/