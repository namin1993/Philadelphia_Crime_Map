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
let allCrime_2021 = new L.LayerGroup();
let allCrime_2022 = new L.LayerGroup();
let allProperties = new L.LayerGroup();

// Create panes
map.createPane('crime2021');
map.getPane('crime2021').style.zIndex = 650;

//create a sortFuncton for L.control //L.control.sortLayers;
// function: set z-index of layers

// function to set the z-index of each layer
/*
function myBring2Front() {
    //layer1.bringToFront();
    //map.getLayer()
    allCrime_2021.eachLayer(function (layer) {
      layer.setZIndex(1000);
    });
    allDistrictBlocks.eachLayer(function (layer) {
      layer.setZIndex(2000);
    });
}
*/

/*
 * Ensure that layers are displayed in the correct Z-Order
 * Instead of explicitly defining z-order on the groups the order of the calls to beingToFront controls the resulting zOrder
 *  dataLayers Object that holds the references to the layer groups toggled by the layer control

function fixZOrder(dataLayers){

    //var previousLayerGroup = '';

    // only similar approach is to remove and re-add back to the map
    // use the order in the dataLayers object to define the z-order
    Object.keys(dataLayers).forEach(function (key) {

        // check if the layer has been added to the map, if it hasn't then do nothing
        // we only need to sort the layers that have visible data
        // Note: this is similar but faster than trying to use map.hasLayer()
        var layerGroup = dataLayers[key];
        console.log(layerGroup);
        console.log(layerGroup._leaflet_id);
        if (layerGroup._leaflet_id
            && (layerGroup._leaflet_id > previousLayerGroup._leaflet_id)){
                console.log(layerGroup._layers);
                layerGroup.bringToFront();
                //previousLayerGroup = layerGroup;
            }
    });
}
*/

// add an overlay - effect
// One time event - when overlays are added, place allCrime_2021 data on the front
/*
map.on('overlayadd', function(e) {
    //fixZOrder(overlays);
    console.log(allCrime_2021);
    myBring2Front();
    //allCrime_2021._layers.bringToFront;
});
*/

// remove an overlay - effect
/*
map.on('overlayremove', function(e) {
});
*/
let District_GeoJSON_Path = "../static/json/Philadelphia-Neighborhood_FoodRetail.geojson";
let Philadelphia_Crime_2021_Path = "../static/json/Philadelphia_Crime_Data-2021_No_NaN.geojson";
let Philadelphia_Crime_2022_Path = "../static/json/Philadelphia_Crime_Data-2022_No_NaN.geojson";

// Add references to the layers to the overlays object.
let overlays = {
    "DistrictBlocks": allDistrictBlocks,
    "Crime - 2021": allCrime_2021,
    "Crime - 2022": allCrime_2022
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

// Add 2021 Philadelphia Crime Data
d3.json(Philadelphia_Crime_2021_Path).then(function(data) {

    L.geoJson(data, {
        // We turn each feature into a circleMarker on the map.
        // Filter should return 133230
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: styleInfo,
        onEachFeature: function(feature, layer){
            layer.bindPopup(`Date: ${feature.properties.dispatch_date}<br/>Time: ${feature.properties.dispatch_time}<br/>Location: ${feature.properties.location_block}
            <br/>Crime: ${feature.properties.text_general_code}`)
        }
    }).addTo(allCrime_2021);
});
allCrime_2021.addTo(map);

// Add 2022 Philadelphia Crime Data
d3.json(Philadelphia_Crime_2022_Path).then(function(data) {

    L.geoJson(data, {
        // We turn each feature into a circleMarker on the map.
        // Filter should return 133230
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: styleInfo,
        onEachFeature: function(feature, layer){
            layer.bindPopup(`Date: ${feature.properties.dispatch_date}<br/>Time: ${feature.properties.dispatch_time}<br/>Location: ${feature.properties.location_block}
            <br/>Crime: ${feature.properties.text_general_code}`)
        }
    }).addTo(allCrime_2022);
});
allCrime_2022.addTo(map);

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


/*
*
* Create a GeoJson layer where you Filter Crime data points by selected Crime type and Year
* In filter, use an str.regex()expression to determine if feature.properties.dispatch_date == '21'
* In filter, determine crime type in feature.properties.text_general_code
* On each filtered data point, create a marker with certain style properties styleInfo/getColor
* Filter crime type from correct GeoJson file (according to year selected) and create a layer
* Create an array of layers of each type of filtered crime and year into a LayerGroup
* Add LayerGroup to layerControl to add Overlay on the map
*
*
*/


//var crime_2021_list = L.layerGroup([Theft, Homicide, Arson, Aggravated_Assault, Sex_Offenses, Liquor, Fraud, Drugs, Family, Miscellaneous]);
// layerControl.addOverlay(crime_2021_list, "2021 Philly Crime");





