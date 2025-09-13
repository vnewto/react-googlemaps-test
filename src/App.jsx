import "./App.css";
import {
  APIProvider,
  Map,
  useMap,
  AdvancedMarker,
  Marker,
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
      location: {
        lat: 42.38782221947883,
        lng: -71.23670789679711,
      },
    },
    {
      name: "testMarkers2",
      location: {
        lat: 42.405697803295766,
        lng: -71.24311923980713,
      },
    },
    {
      name: "testMarkers3",
      location: {
        lat: 42.36863938831473,
        lng: -71.25199387199015,
      },
    },
  ];

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
                <AdvancedMarker position={marker.location}>
                  <span style={{ fontSize: "2rem" }}>☀️</span>
                </AdvancedMarker>
              </div>
            );
          })}
        </Map>
      </APIProvider>
    </div>
  );
}

export default App;
