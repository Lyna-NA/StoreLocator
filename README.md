# Store Locator

> Node/Express/Mongo API with GeoJSON location field for store locations. Simple vanilla JS frontend using the OpenLayers Library


- The project allows users to input a store address and have the app automatically convert the address to coordinates and then mark the location on the map.
- The app uses the [MapQuest prediction endpoint](https://developer.mapquest.com/documentation/searchahead-api/get) to provide real-time suggestions as the user types in their address. 
- The app uses Node Geocoder to perform the geocoding process, and then stores the coordinates in the database using Mongoose pre-middleware.
- The front-end of the app uses Vanilla JavaScript and OpenLayers to display the map and plot the store locations. 

## Quick Start

> Add your MONGO_URI and GEOCODER_API_KEY to the "config/config.env" file.

```bash
# Install dependencies
npm install

# Serve on localhost:5000
npm run dev (nodemon)
or
npm start

# Routes
GET    /api/v1/stores # Get Stores

POST   /api/v1/stores # Add Store
body { storeId: "0001", address: "10 main st Boston MA" }
```
