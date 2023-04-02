// Create the map object
var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([34.3088, 31.3547]),
    zoom: 9
  })
});

// Fetch stores from API
fetch('/api/v1/stores')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    // Convert store data into features
    var stores = data.data.map(function(store) {
      return new ol.Feature({
        geometry: new ol.geom.Point(
          ol.proj.fromLonLat([
            store.location.coordinates[0],
            store.location.coordinates[1]
          ])
        ),
        storeId: store.storeId
      });
    });
  // Create a vector layer for the stores
  var vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: stores
    }),
    style: function(feature) {
      return new ol.style.Style({
        image: new ol.style.Icon({
          src: 'https://openlayers.org/en/latest/examples/data/icon.png',
          anchor: [0.5, 1],
          scale: 1
        }),        
        text: new ol.style.Text({
          text: feature.get('storeId').toString(),
          fill: new ol.style.Fill({
            color: '#000'
          }),
          font: '12px sans-serif',
          offsetY: -18
        })
      });
    }
  });

    console.log("Map: ", map);
    // Add the vector layer to the map
    map.addLayer(vectorLayer);
  });
