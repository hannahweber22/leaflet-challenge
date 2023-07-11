// Creating the map object
let myMap = L.map("map", {
    center: [41.5121667,-112.8563333],
    zoom: 5
  });
  
// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);


// Define a markerSize() function that will give each earthquake a different radius based on its magnitude.
function markerSize(magnitude) {
    return magnitude * 10000
  }

// Define a opacityFill() function that will give each earthquake a different fill opacity based on its depth
function opacityFill(depth) {
    return depth / 25;
  }

/////https://leafletjs.com/examples/choropleth////// was used for 'Adding some Color' and 'Legend'
//Define a getColor() function that will give each earthquake a different fll color based on its depth
function getColor(d) {
    return d > 90  ? '#BD0026' :
           d > 70  ? '#E31A1C' :
           d > 50  ? '#FC4E2A' :
           d > 30   ? '#FD8D3C' :
           d > 10   ? '#FEB24C' :
           d > -10   ? '#FED976' :
                      '#FFEDA0';
}

 
// Assemble the API  URL.
let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'
  
  // Get the data with d3.
d3.json(url).then(function(response) {
  
    console.log('response', response);

    features = response.features;

    for (let i = 0; i < features.length; i++) {

        let location = features[i].geometry;

        let properties = features[i].properties;

        if(location){(
        L.circle([location.coordinates[1], location.coordinates[0]], 
            {
                color: "green",
                fillColor: getColor(location.coordinates[2]),
                weight: opacityFill(location.coordinates[2]),
                fillOpacity: opacityFill(location.coordinates[2]),
                radius: markerSize(properties.mag)
              })
        .bindPopup(`<h3>Location: ${[location.coordinates[1], location.coordinates[0]]}</h3>
        <h3>Magnitude: ${properties.mag}</h3>
        <h3>Depth: ${location.coordinates[2]}</h3>`))
        .addTo(myMap);
        
        }
  }
  
/////////////////// LEGEND ///////////////////////
/////https://leafletjs.com/examples/choropleth////// was used for 'Adding some Color' and 'Legend'
  
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        limits = [-10, 10, 30,  50,  70,  90],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < limits.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(limits[i] + 1) + '"></i> ' +
            limits[i] + (limits[i + 1] ? '&ndash;' + limits[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);

})