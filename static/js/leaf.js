// leaflet map lives here
console.log('leaf.js loaded');

// var mapWidth = d3.select('#map').property('offsetWidth');
// var mapHeight = 3 * mapWidth / 4;
// d3.select('#map').attr('width', mapWidth).attr('height', mapHeight);

function buildMap(baths, beds) {
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/light-v10",
        accessToken: API_KEY
    });

    var myMap = L.map("map", {
        center: [37.0902, -95.7129],
        zoom: 4,
        layers: [lightmap, baths]
    });

    let circleMap = {
        'Baths': baths,
        'Beds': beds
    };

    L.control.layers(circleMap).addTo(myMap);


}




// function scaleBath(bath){
//     return 2 * bath;
// }

function createMarkers(gData) {

    // setting length of data for for loops
    const dataLength = gData.length;
    // ================================
    // circles for Beds
    function scaleBed(bed) {
        return 1 * bed;
    }

    let bedCircles = [];

    for (let i = 0; i < dataLength; i++) {
        const current = gData[i];
        let bedCircle = L.circleMarker([current.latitude, current.longitude], {
            color: 'black',
            fillColor: 'green',
            radius: scaleBed(current.beds),
            fillOpacity: 0.1,
            opacity: 0.1
        });
        bedCircles.push(bedCircle);
    }
    let bedCircleLayer = L.layerGroup(bedCircles);





    // ===================================

    // ================================
    // circles for Baths
    function scaleBath(bath) {
        return 1.5 * bath;
    }
    var bathCircles = [];

    for (let i = 0; i < dataLength; i++) {
        const current = gData[i];
        var bathCircle = L.circleMarker([current.latitude, current.longitude], {
            color: 'black',
            fillColor: 'purple',
            radius: scaleBath(current.bath),
            fillOpacity: 0.1,
            opacity: 0.1
        });
        bathCircles.push(bathCircle);
    }
    let bathCircleLayer = L.layerGroup(bathCircles);
    // ===================================

    buildMap(bathCircleLayer, bedCircleLayer);
}

benji.json('/graphsdata', data => {
    console.log(data);

    console.log(d3.extent(data.map(d => d.bath)));
    console.log(d3.extent(data.map(d => d.beds)));


    createMarkers(data);

    console.log('Done');

});

