// Set URL 
url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Load data in with D3.json
d3.json(url).then(function(data){
    console.log(data.features)

    // Value to hold data.features
    const quakeData = data.features

    // Setting layer to variable
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })

    // Map creation na dloading in layer
    let myMap = L.map("map",{
        center: [37.09, -95.71],
        zoom: 3,
        layers: street
    });

    // Function to set size of marker when called
    function markerSize(magnitude){
        return magnitude * 30000;
    }

    // Function to set color of marker when called
    function markerColor(depth){
        if (depth < 10){
            return '#9BD770';
          }
          else if (depth < 30){
            return '#F1F791';
          }
          else if (depth < 50){
            return '#FDE281';
          }
          else if (depth < 70){
            return '#E9B701';
          }
          else if (depth < 90){
            return '#E48D0C';
          }
          else{
            return '#950E17';
        };
        
        
    }
    
    // For loop to iterate through data
    for (let i = 0 ; i < quakeData.length ; i++){

        // Setting data to variable 
        let x = quakeData[i].geometry

        // Lat & Lng set to variables
        let lat = x.coordinates[1];
        let lng = x.coordinates[0];

        // Depth and magnitude set
        let depth = x.coordinates[2];
        let magnitude = quakeData[i].properties.mag;

        // Popup variable set
        let proper = quakeData[i].properties;

        // Creating circle markers
        L.circle([lat,lng],{
            color: 'black',
            opacity: .1,
            fillColor: markerColor(depth),
            fillOpacity: .75,
            radius: markerSize(magnitude),
        }).bindPopup(`<h1> ${proper.place}</h1> <h3> Magnitude: ${proper.mag}</h3> <h3> Depth: ${depth}</h3> <hr> <h3> Location: ${new Date(proper.time)}</h3>`).addTo(myMap);
    }

    // Setting variabel for legend
    var legend = L.control({ position: 'bottomright' });

    //Building legend
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "legend");
      
        div.innerHTML += '<i style="background: #9BD770"></i><span>>10</span><br>';
        div.innerHTML += '<i style="background: #F1F791"></i><span>10-30</span><br>';
        div.innerHTML += '<i style="background: #FDE281"></i><span>30-50</span><br>';
        div.innerHTML += '<i style="background: #E9B701"></i><span>50-70</span><br>';
        div.innerHTML += '<i style="background: #E48D0C"></i><span>70-90</span><br>';
        div.innerHTML += '<i style="background: #950E17"></i><span>90+</span><br>';
        
        return div;
      
    };

    // Adding legend
    legend.addTo(myMap);

});
