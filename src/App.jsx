import "./App.css";
import {
  APIProvider,
  Map,
  useMap,
  AdvancedMarker,
  Marker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useState, useRef, useEffect } from "react";
import CreateCenterControl from "./features/map";

function App() {
  const testMarker = {
    name: "test point 1",
    lat: 42.393800907995406,
    lng: -71.22784677141598,
  };

  const testMarkers = [
    {
      name: "testMarkers1",
      randomWord: "yelp",
      location: {
        lat: 42.38782221947883,
        lng: -71.23670789679711,
      },
    },
    {
      name: "testMarkers2",
      randomWord: "snipe",
      location: {
        lat: 42.405697803295766,
        lng: -71.24311923980713,
      },
    },
    {
      name: "testMarkers3",
      randomWord: "magenta",
      location: {
        lat: 42.36863938831473,
        lng: -71.25199387199015,
      },
    },
  ];

  // set Usestate for whether a marker has been clicked on (to display info window)
  const [selectedMarker, setSelectedMarker] = useState("");

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <h1>GoogleMaps API Integration</h1>
      <APIProvider
        apiKey={import.meta.env.VITE_GOOGLEMAPS_API_KEY}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <Map
          defaultZoom={13}
          region="US"
          defaultCenter={{ lat: 42.393800907995406, lng: -71.22784677141598 }}
          onCameraChanged={(event) =>
            console.log(
              "camera changed:",
              event.detail.center,
              "zoom:",
              event.detail.zoom
            )
          }
          onClick={(e) => console.log("current coordinates ", e.detail.latLng)}
          reuseMaps={true} // allows map instance caching
          mapId={import.meta.env.VITE_GOOGLEMAPS_MAP_ID}
        >
          <AdvancedMarker position={testMarker} key={testMarker}>
            <span style={{ fontSize: "2rem" }}>☂️</span>
          </AdvancedMarker>
          {testMarkers.map((marker) => {
            return (
              <div key={marker.name}>
                <AdvancedMarker
                  position={marker.location}
                  // add onClick event listener for when a user clicks on a marker
                  onClick={() => {
                    setSelectedMarker(marker);
                  }}
                >
                  <span style={{ fontSize: "2rem" }}>☀️</span>
                </AdvancedMarker>
              </div>
            );
          })}
          {/* if selectedMarker isn't empty, show the info window */}
          {selectedMarker && (
            <InfoWindow position={selectedMarker.location}>
              <h1>{selectedMarker.name}</h1>
              <p>{selectedMarker.randomWord}</p>

              <button onClick={() => setSelectedMarker("")}>Close</button>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
}

export default App;
