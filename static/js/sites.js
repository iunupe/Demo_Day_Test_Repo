// // Store our API endpoint inside queryUrl
// var queryUrl = "/static/sites.geojson";
// // Perform a GET request to the query URL
// d3.json(queryUrl, function(data) {
//   console.log(data)
//   data.features = data.features.filter(d=>d.geometry)
//   createFeatures(data)
// });

// function createFeatures(earthquakeData) {

//   // Define a function we want to run once for each feature in the features array

//   function onEachFeature(feature, layer) {
//     layer.bindPopup("<h1> Place:" + feature.properties.facility + "</h1> <hr> <h3>"  + feature.properties.address + "</h3><hr><p>" + feature.properties.phone + "</p>");
//   }
//   console.log("Data ",earthquakeData);

//   // Create a GeoJSON layer containing the features array on the Covid object
//   // Run the onEachFeature function once for each piece of data in the array
//   var sites = L.geoJSON(earthquakeData, {
//     onEachFeature: onEachFeature
//   });

//   // Sending our earthquakes layer to the createMap function
//   createMap(sites);
// }

// function createMap(sites) {

//   // Define streetmap and darkmap layers
//   var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: API_KEY
//   });

//   var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "dark-v10",
//     accessToken: API_KEY
//   });

//   // Define a baseMaps object to hold our base layers
//   var baseMaps = {
//     "Street Map": streetmap,
//     "Dark Map": darkmap
//   };

//   // Create overlay object to hold our overlay layer
//   var overlayMaps = {
//     Sites: sites
//   };

//   // Create our map, giving it the streetmap and earthquakes layers to display on load
//   var myMap = L.map("marker-map", {
//     center: [
//       41.87, -87.62
//     ],
//     zoom: 10,
//     layers: [streetmap, sites]
//   });

//   // Create a layer control
//   // Pass in our baseMaps and overlayMaps
//   // Add the layer control to the map
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap);
// }

// // Store our API endpoint inside queryUrl
// var queryUrl = "/static/sites.geojson";
// // Perform a GET request to the query URL

// d3.json(queryUrl).then(function(data) {
//   console.log(data)
  
//   //data.features = data.features.filter(d=>d.geometry)
//   createFeatures(data)
// });




//new
// Store our API endpoint inside queryUrl
var siteUrl = "/static/sites.geojson";


//RenderMap function
renderMap(siteUrl);

// Perform a GET request to the query URL
function renderMap(siteUrl){

   
  d3.json(siteUrl).then(function(data) {
    console.log(data)
    var siteData=data;
    //data.features = data.features.filter(d=>d.geometry)
    createFeatures(siteData);
  });

}

function createFeatures(siteData) {

  // Define a function we want to run once for each feature in the features array

  function onEachSiteFeature(feature, layer) {
    layer.bindPopup("<h6>" + feature.properties.facility + "</h6> <hr> <h6>"  + feature.properties.address + "</h6><hr><p>" + feature.properties.phone + "</p>");
  }

  // Create a GeoJSON layer containing the features array on the Covid object
  // Run the onEachFeature function once for each piece of data in the array
  var testingSites = L.geoJSON(siteData, {
    onEachFeature: onEachSiteFeature
  });
 
 


  // Sending our earthquakes layer to the createMap function
  createMap(testingSites);
}

function createMap(testingSites) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    "Testing Sites": testingSites,
    
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("marker-map", {
    center:[41.87, -87.62],
    zoom: 10,
    layers: [streetmap, testingSites]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}



