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
    return Math.sqrt(Math.abs(magnitude)) * 100;
  }

// Define a opacityFill() function that will give each earthquake a different fill opacity based on its depth
function opacityFill(depth) {
    return Math.sqrt(depth) * 100;
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
                fillColor: "green",
                fillOpacity: opacityFill(location.coordinates[2]),
                radius: markerSize(properties.mag)
              })
        .bindPopup(`<h3>Location: ${[location.coordinates[1], location.coordinates[0]]}</h3>
        <h3>Magnitude: ${properties.mag}</h3>
        <h3>Depth: ${location.coordinates[2]}</h3>`))
        .addTo(myMap);
        
        }

    }

    // Add legend (don't forget to add the CSS from index.html)
    var legend = L.control({ position: 'bottomright' })
    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend')
        var limits = choroplethLayer.options.limits
        var colors = choroplethLayer.options.colors
        var labels = []

        // Add min & max
        div.innerHTML = '<div class="labels"><div class="min">' + limits[0] + '</div> \
                <div class="max">' + limits[limits.length - 1] + '</div></div>'

        limits.forEach(function (limit, index) {
        labels.push('<li style="background-color: ' + colors[index] + '"></li>')
        })

        div.innerHTML += '<ul>' + labels.join('') + '</ul>'
        return div
    }

    legend.addTo(map)
  
  });
  