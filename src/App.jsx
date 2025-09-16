import "./App.css";
import {
  APIProvider,
  Map,
  useMap,
  AdvancedMarker,
  Marker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useState, useRef, useEffect, useCallback } from "react";
import CreateCenterControl from "./features/map";
import FilteredList from "./features/filteredList";

function App() {
  // url and token for fetch request from airtable
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${
    import.meta.env.VITE_TABLE_NAME
  }`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  useEffect(() => {
    const fetchMapData = async () => {
      const options = {
        method: "GET",
        headers: { Authorization: token },
      };
      try {
        const resp = await fetch(url, options);
        console.log("Response status: ", resp.status);
        if (!resp.ok) {
          const errorText = await resp.text();
          console.log("Error response body:", errorText);
          throw new Error(`HTTP ${resp.status}: ${errorText}`);
        }

        const data = await resp.json();
        if (data.status != "success") {
          throw new Error(data.status);
        }
        console.log(data);
      } catch (error) {
        console.log("Fetch error: ", error.message);
      }
    };
    fetchMapData();
  }, [token, url]);

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

  const closeInfoWindow = useCallback(() => setSelectedMarker(""), []);

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
                    closeInfoWindow;
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
            <InfoWindow
              position={selectedMarker.location}
              options={{
                pixelOffset: new window.google.maps.Size(0, -35),
              }}
              onClose={closeInfoWindow}
              onCloseClick={closeInfoWindow}
            >
              <h1>{selectedMarker.name}</h1>
              <p>{selectedMarker.randomWord}</p>

              <button onClick={closeInfoWindow}>Close</button>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
      <FilteredList />
    </div>
  );
}

export default App;
