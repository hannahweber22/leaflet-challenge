# leaflet-challenge

# I developed a way to visualize the USGS data to allow the USGS to better educate the public and other government organizations on issues facing our planet. To acoomplish this, I completed Part 1 of the activity which creates an earthquake visualization. I specifically created a visualization for the All Earthquakes data for the past 7 days (https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson). I imported the data by connecting to the geojson API using d3, loaded the TileLayer, created points on the map for earthquakes according to their longitude and latitude, and a legend showing the depth of the earthquakes. The earthquake points radius is based on magnitude, color is based on depth, and popups are associated with the points. 

# To visualize the map, the user should open the index file. To view a popup of an earthquake, the user should click on an earthquakes point.

# PLEASE NOTE: The leaflet documentation https://leafletjs.com/examples/choropleth/ was used in the making of the legend and the getColor function. Code from this documentation was used in both the javascript and css files. 