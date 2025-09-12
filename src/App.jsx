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
    lat: 42.393800907995406,
    lng: -71.22784677141598,
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
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
        </Map>
      </APIProvider>
    </div>
  );
}

export default App;
