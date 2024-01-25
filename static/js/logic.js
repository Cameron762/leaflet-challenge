// Set URL 
url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Load data in with D3.json
d3.json(url).then(function(data){

    // Sending data to function
    quakeMarkers(data.features)
})

function quakeMarkers(quakeData){

    // Creating map and layers
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })

    let myMap = L.map("map",{
        center: [37.09, -95.71],
        zoom: 3,
        layers: street
    });
    
    // For loop to iterate through data
    for (let i = 0 ; i < quakeData.length ; i++){

        // Setting variable for lat, lng, and depth
        let x = quakeData[i].geometry

        // Lat & Lng to variables
        let lat = x.coordinates[1];
        let lng = x.coordinates[0];

        //
        let proper = quakeData[i].properties

        let depth = x.coordinates[2];

        let color = "";

        if (depth > 100) {
            color = "red";
        }
        else if (depth > 75) {
            color = "scarlet";
        }
        else if (depth > 70) {
            color = "orange";
        }
        else if (depth > 50) {
            color = "brown";
        }
        else if (depth > 30) {
            color = "brown";
        }
        else {
            color = "green";
        }

        L.circle([lat,lng],{
            color: 'black',
            fillColor: color,
            fillOpacity: .75,
            radius: (proper.mag) * 15000,
        }).bindPopup(`<h1> ${proper.place}</h1> <h3> Magnitude: ${proper.mag}</h3> <hr> <h3> Location: ${new Date(proper.time)}</h3>`).addTo(myMap);//
    }

}