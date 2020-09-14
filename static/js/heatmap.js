var myMap = L.map("heat-map", {
  center: [41.87, -87.62],
  zoom: 10
});
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);


var queryUrl = "/static/COVID-19.geojson";
d3.json(queryUrl).then(function(response) {
  console.log(response)
  var heatArray = [];
  for (var i = 0; i < response.features.length; i++) {
    var location = response.features[i];
    if (location.geometry) {
      var covidpos = location.properties.cases_cumulative;
      for (var j = 0; j < covidpos; j++) {
        heatArray.push([location.geometry.coordinates[1], location.geometry.coordinates[0]]);
      }
    }
  }
  function style(feature) {
    return {
        fillColor: getColor(features.properties.zip_code),
        weight: 2,
        opacity: 1,
        color: 'red',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
  var heat = L.heatLayer(heatArray, {
    radius: 25,
    blur: 35
  }).addTo(myMap) 
  // setTimeout(()=>heat.addTo(myMap),5000);
});
