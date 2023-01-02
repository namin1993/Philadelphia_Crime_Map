// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Light: light,
    Dark: dark
  };

// Create the map object with center, zoom level and default layer at Philadelphia
let map = L.map('mapid', {
    center: [39.95,-75.15],
    zoom: 11,
    layers: [light]
});
  
//Add a 3rd layer group for crime and block data
let allDistrictBlocks = new L.LayerGroup();
let allProperties = new L.LayerGroup();
let theftsLayerGroup_2021 = new L.LayerGroup();
let homicideLayerGroup_2021 = new L.LayerGroup();
let arsonLayerGroup_2021 = new L.LayerGroup();
let aggAssaultLayerGroup_2021 = new L.LayerGroup();
let sexOffenseLayerGroup_2021 = new L.LayerGroup();
let liquorLayerGroup_2021 = new L.LayerGroup();
let fraudLayerGroup_2021 = new L.LayerGroup();
let drugLayerGroup_2021 = new L.LayerGroup();
let familyOffenseLayerGroup_2021 = new L.LayerGroup();
let otherOffenseLayerGroup_2021 = new L.LayerGroup();

// Create panes
map.createPane('crime2021');
map.getPane('crime2021').style.zIndex = 650;

let District_GeoJSON_Path = "../static/json/Philadelphia-Neighborhood_FoodRetail.geojson";
let Philadelphia_Crime_2021_Path = "../static/json/Philadelphia_Crime_Data-2021_No_NaN.geojson";

// Add references to the layers to the overlays object.
let overlays = {
    "DistrictBlocks": allDistrictBlocks,
    "Residential Property Prices": allProperties,
    "Thefts - 2021" : theftsLayerGroup_2021,
    "Homicide - 2021" : homicideLayerGroup_2021,
    "Arson - 2021" : arsonLayerGroup_2021,
    "Aggravated Assault - 2021" : aggAssaultLayerGroup_2021,
    "Sex Offenses - 2021" : sexOffenseLayerGroup_2021,
    "Liquor Violations - 2021" : liquorLayerGroup_2021,
    "Fraud & Embezzlement - 2021" : fraudLayerGroup_2021,
    "Drug Violations - 2021" : drugLayerGroup_2021,
    "Family & Children Offenses - 2021" : familyOffenseLayerGroup_2021,
    "Other Crimes - 2021": otherOffenseLayerGroup_2021
};

// Add a control to the map that will allow the user to change which layers are visible.
var layerControl = L.control.layers(baseMaps, overlays).addTo(map);

// Plot point style
function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.text_general_code),
        color: "#000000",
        radius: 4,
        stroke: true,
        weight: 0.5
    };
}

// Change Color Key
function getColor(crime_type) {
    return crime_type === "Thefts" ? '#00f9ff' :
    crime_type === "Theft from Vehicle" ? '#00f9ff' :
    crime_type === "Robbery No Firearm" ? '#00f9ff' :
    crime_type === "Burglary Non-Residential" ? '#00f9ff' :
    crime_type === "Burglary Residential" ? '#00f9ff' :
    crime_type === "Robbery Firearm" ? '#00f9ff':
    crime_type === "Homicide - Criminal" ? '#beff00' :
    crime_type === "Arson" ? '#f58934' :
    crime_type === "Aggravated Assault No Firearm" ? '#fff000' :
    crime_type === "Aggravated Assault Firearm" ? '#fff000' :
    crime_type === "Rape" ? '#f231f2' :
    crime_type === "Other Sex Offenses (Not Commercialized)" ? '#f231f2' :
    crime_type === "Prostitution and Commercialized Vice" ? '#f231f2' :
    crime_type === "Liquor Law Violations" ? '#bd00ff' :
    crime_type === "Public Drunkenness" ? '#bd00ff' :
    crime_type === "Fraud" ? '#00f2ff' :
    crime_type === "Receiving Stolen Property" ? '#00ff2f' :
    crime_type === "Forgery and Counterfeiting" ? '#00ff2f' :
    crime_type === "Embezzlement" ? '#00ff2f' :
    crime_type === "Narcotic / Drug Law Violations" ? '#f58934' :
    crime_type === "Offenses Against Family and Children" ? '#ea48a7' :
               '#7b6773';
}

// Filter All Theft Crime in 2021
d3.json(Philadelphia_Crime_2021_Path).then(function(data) {
    var theft = L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        filter: function (feature, layer) {
            if (feature.properties.text_general_code === "Thefts"){
                return true;
            }
            else if(feature.properties.text_general_code === "Theft from Vehicle"){
                return true;
            }
            else if(feature.properties.text_general_code === "Robbery No Firearm"){
                return true;
            }
            else if(feature.properties.text_general_code === "Burglary Non-Residential"){
                return true;
            }
            else if(feature.properties.text_general_code === "Burglary Residential"){
                return true;
            }
            else if(feature.properties.text_general_code === "Robbery Firearm"){
                return true;
            }
            else{
                return false;
            }
            //return feature.properties.text_general_code === "Thefts"
        },
        style: styleInfo,
        onEachFeature: function(feature, layer){
            layer.bindPopup(`Date: ${feature.properties.dispatch_date}<br/>Time: ${feature.properties.dispatch_time}<br/>Location: ${feature.properties.location_block}
            <br/>Crime: ${feature.properties.text_general_code}`);
        }
    });
    theft.addTo(theftsLayerGroup_2021);
});
theftsLayerGroup_2021.addTo(map);

// Filter All Homicide Crime in 2021
d3.json(Philadelphia_Crime_2021_Path).then(function(data) {
    var homicide = L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        filter: function (feature, layer) {
            if (feature.properties.text_general_code === "Homicide - Criminal"){
                return true;
            }
            else{
                return false;
            }
        },
        style: styleInfo,
        onEachFeature: function(feature, layer){
            layer.bindPopup(`Date: ${feature.properties.dispatch_date}<br/>Time: ${feature.properties.dispatch_time}<br/>Location: ${feature.properties.location_block}
            <br/>Crime: ${feature.properties.text_general_code}`);
        }
    });
    homicide.addTo(homicideLayerGroup_2021);
});
homicideLayerGroup_2021.addTo(map);

// Filter All Arson Crime in 2021
d3.json(Philadelphia_Crime_2021_Path).then(function(data) {
    var arson = L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        filter: function (feature, layer) {
            if (feature.properties.text_general_code === "Arson"){
                return true;
            }
            else{
                return false;
            }
        },
        style: styleInfo,
        onEachFeature: function(feature, layer){
            layer.bindPopup(`Date: ${feature.properties.dispatch_date}<br/>Time: ${feature.properties.dispatch_time}<br/>Location: ${feature.properties.location_block}
            <br/>Crime: ${feature.properties.text_general_code}`);
        }
    });
    arson.addTo(arsonLayerGroup_2021);
});
arsonLayerGroup_2021.addTo(map);

// Filter All Aggravated Assault Crime in 2021
d3.json(Philadelphia_Crime_2021_Path).then(function(data) {
    var aggAssault = L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        filter: function (feature, layer) {
            if (feature.properties.text_general_code === "Aggravated Assault No Firearm"){
                return true;
            }
            else if(feature.properties.text_general_code === "Aggravated Assault Firearm"){
                return true;
            }
            else{
                return false;
            }
        },
        style: styleInfo,
        onEachFeature: function(feature, layer){
            layer.bindPopup(`Date: ${feature.properties.dispatch_date}<br/>Time: ${feature.properties.dispatch_time}<br/>Location: ${feature.properties.location_block}
            <br/>Crime: ${feature.properties.text_general_code}`);
        }
    });
    aggAssault.addTo(aggAssaultLayerGroup_2021);
});
aggAssaultLayerGroup_2021.addTo(map);

// Filter All Sexual Assault Crime in 2021
d3.json(Philadelphia_Crime_2021_Path).then(function(data) {
    var sexOffenses = L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        filter: function (feature, layer) {
            if (feature.properties.text_general_code === "Rape"){
                return true;
            }
            else if(feature.properties.text_general_code === "Other Sex Offenses (Not Commercialized)"){
                return true;
            }
            else if(feature.properties.text_general_code === "Prostitution and Commercialized Vice"){
                return true;
            }
            else{
                return false;
            }
        },
        style: styleInfo,
        onEachFeature: function(feature, layer){
            layer.bindPopup(`Date: ${feature.properties.dispatch_date}<br/>Time: ${feature.properties.dispatch_time}<br/>Location: ${feature.properties.location_block}
            <br/>Crime: ${feature.properties.text_general_code}`);
        }
    });
    sexOffenses.addTo(sexOffenseLayerGroup_2021);
});
sexOffenseLayerGroup_2021.addTo(map);

// Filter All Liquor Violations Crime in 2021
d3.json(Philadelphia_Crime_2021_Path).then(function(data) {
    var liquorAssault = L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        filter: function (feature, layer) {
            if (feature.properties.text_general_code === "Liquor Law Violations"){
                return true;
            }
            else if(feature.properties.text_general_code === "Public Drunkenness"){
                return true;
            }
            else{
                return false;
            }
        },
        style: styleInfo,
        onEachFeature: function(feature, layer){
            layer.bindPopup(`Date: ${feature.properties.dispatch_date}<br/>Time: ${feature.properties.dispatch_time}<br/>Location: ${feature.properties.location_block}
            <br/>Crime: ${feature.properties.text_general_code}`);
        }
    });
    liquorAssault.addTo(liquorLayerGroup_2021);
});
liquorLayerGroup_2021.addTo(map);

// Filter All Fraud Embezzlement Crimes in 2021
d3.json(Philadelphia_Crime_2021_Path).then(function(data) {
    var fraudCrimes = L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        filter: function (feature, layer) {
            if (feature.properties.text_general_code === "Fraud"){
                return true;
            }
            else if(feature.properties.text_general_code === "Receiving Stolen Property"){
                return true;
            }
            else if(feature.properties.text_general_code === "Forgery and Counterfeiting"){
                return true;
            }
            else if(feature.properties.text_general_code === "Embezzlement"){
                return true;
            }
            else{
                return false;
            }
        },
        style: styleInfo,
        onEachFeature: function(feature, layer){
            layer.bindPopup(`Date: ${feature.properties.dispatch_date}<br/>Time: ${feature.properties.dispatch_time}<br/>Location: ${feature.properties.location_block}
            <br/>Crime: ${feature.properties.text_general_code}`);
        }
    });
    fraudCrimes.addTo(fraudLayerGroup_2021);
});
fraudLayerGroup_2021.addTo(map);

// Filter All Liquor Violations Crime in 2021
d3.json(Philadelphia_Crime_2021_Path).then(function(data) {
    var liquorViolation = L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        filter: function (feature, layer) {
            if (feature.properties.text_general_code === "Liquor Law Violations"){
                return true;
            }
            else if(feature.properties.text_general_code === "Public Drunkenness"){
                return true;
            }
            else{
                return false;
            }
        },
        style: styleInfo,
        onEachFeature: function(feature, layer){
            layer.bindPopup(`Date: ${feature.properties.dispatch_date}<br/>Time: ${feature.properties.dispatch_time}<br/>Location: ${feature.properties.location_block}
            <br/>Crime: ${feature.properties.text_general_code}`);
        }
    });
    liquorViolation.addTo(liquorLayerGroup_2021);
});
liquorLayerGroup_2021.addTo(map);

// Filter All Drug Crimes in 2021
d3.json(Philadelphia_Crime_2021_Path).then(function(data) {
    var drugViolation = L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        filter: function (feature, layer) {
            if (feature.properties.text_general_code === "Narcotic / Drug Law Violations"){
                return true;
            }
            else{
                return false;
            }
        },
        style: styleInfo,
        onEachFeature: function(feature, layer){
            layer.bindPopup(`Date: ${feature.properties.dispatch_date}<br/>Time: ${feature.properties.dispatch_time}<br/>Location: ${feature.properties.location_block}
            <br/>Crime: ${feature.properties.text_general_code}`);
        }
    });
    drugViolation.addTo(drugLayerGroup_2021);
});
drugLayerGroup_2021.addTo(map);

// Filter All Family Crimes in 2021
d3.json(Philadelphia_Crime_2021_Path).then(function(data) {
    var familyCrimes = L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        filter: function (feature, layer) {
            if (feature.properties.text_general_code === "Offenses Against Family and Children"){
                return true;
            }
            else{
                return false;
            }
        },
        style: styleInfo,
        onEachFeature: function(feature, layer){
            layer.bindPopup(`Date: ${feature.properties.dispatch_date}<br/>Time: ${feature.properties.dispatch_time}<br/>Location: ${feature.properties.location_block}
            <br/>Crime: ${feature.properties.text_general_code}`);
        }
    });
    familyCrimes.addTo(familyOffenseLayerGroup_2021);
});
familyOffenseLayerGroup_2021.addTo(map);


// Hover around Disctrict block gives data on top right 
var infoBlock = L.control();

infoBlock.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'infoBlock'); // create a div with a class "info"
    this.update();
    return this._div;
};

// Method that we will use to update the control based on feature properties passed
infoBlock.update = function (props) {
    this._div.innerHTML = '<h4>Block Info</h4>' + (props ?
        `Block ID: ${props.GEOID10}<br/>Percent Poverty: ${props.PCT_POVERTY}+<br/>High Poverty: ${props.HIGH_POVERTY}
            <br/>Total Number of Restaurants: ${props.TOTAL_RESTAURANTS}<br/>Percent of HPSS Stores: ${Math.round(props.PCT_HPSS)}%` : "Hover over a block");
};

infoBlock.addTo(map);

// Add District With Grocery and Poverty Data
d3.json(District_GeoJSON_Path).then(function(data) {

    var geojson;

    // Function: getColor - return fill color if the block is classified "High Poverty"
    function getFillColor(d) {
        return d === "Yes" ? "#800026" :
                          "#221fe4";
    }

    // Poverty Color Legend
    function fillStyle(feature) {
        return {
            fillColor: getFillColor(feature.properties.HIGH_POVERTY),
            color: getFillColor(feature.properties.HIGH_POVERTY),
            weight: 2,
            opacity: 1,
            fillOpacity: 0.7
        };
    }

    function highlightFeature(e) {
        var layer = e.target;
    
        layer.setStyle({
            weight: 2,
            color: '#666',
            fillOpacity: 0.7
        });
        infoBlock.update(layer.feature.properties);
    }

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
        infoBlock.update();
    }

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight
            //click: zoomToFeature
        });
    }

    // Function for highlighting percent range of poverty
    geojson = L.geoJson(data, {
        style: fillStyle,
        onEachFeature: onEachFeature
    }).addTo(allDistrictBlocks);
});
allDistrictBlocks.addTo(map);

// Create a collapsible legend for Crime Type
let legend = L.control({
  position: "bottomright"
});

// Add all the details for the legend
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");

  const Crime_Categories = ["Thefts", "Criminal Homicide", "Arson", "Aggravated Assault", "Sex Offenses", "Liquor Violations and Public Drunkeness", "Fraud", "Drugs", "Family Abuse", "Miscellaneous"];
  // Change Color Key
  const colors = [
    "#00f9ff",
    "#beff00",
    "#f58934",
    "#fff000",
    "#f231f2",
    "#bd00ff",
    "#00f2ff",
    "#f58934",
    "#ea48a7",
    "#7b6773"
  ];

// Looping through our intervals to generate a label with a colored square for each interval.
  for (var i = 0; i < Crime_Categories.length; i++) {
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " + Crime_Categories[i] + "<br>";
    }
    return div;
};

// Add legend to the map.
legend.addTo(map);






