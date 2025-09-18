import "./App.css";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useState, useEffect, useCallback } from "react";
import CreateCenterControl from "./features/map";
import ProjectsList from "./features/projectsList";

// call function to parse data from object received from airtable
function parseData(data) {
  //create empty variable to store new data
  const result = [];
  //map over data.records
  const records = data.records;
  //for each record:
  records.forEach((record) => {
    //create new empty object
    const object = {};
    //pull id
    object.id = record.id;
    //within fields:
    const fields = record.fields;
    //pull name
    object.name = fields.name;
    //make empty location object with lat & lng inside
    const location = {
      //put lat and long together inside a location object
      lat: fields.lat,
      lng: fields.lng,
    };
    //put location object inside object
    object.location = location;
    //pull project_lead
    object.project_lead = fields.project_lead;
    //pull project status
    object.project_status = fields.project_status;
    //access attachments
    const attachments = fields.attachments;
    console.log("attachments: ", attachments);
    // const attachments_0 = attachments[0];
    // //access url inside attachments
    // console.log("attachments_0: ", attachments_0);
    // const img_url = attachments_0.url;
    // console.log("img_url: ", img_url);
    // object.img_url = img_url;

    //push object into result variable
    result.push(object);
  });
  //check if result formatted properly
  console.log("result: ", result);
  return result;
}

function App() {
  // url and token for fetch request from airtable
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${
    import.meta.env.VITE_TABLE_NAME
  }`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  const [markers, setMarkers] = useState([]);

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
        console.log("data: ", data);

        // call function to parse data from object received from airtable
        const parsedData = parseData(data);
        console.log("parsedData: ", parsedData);

        setMarkers(parsedData);
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    };
    fetchMapData();
  }, [token, url]);

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
          defaultZoom={4}
          region="US"
          defaultCenter={{ lat: 42.393800907995406, lng: -71.22784677141598 }}
          // onCameraChanged={(event) =>
          //   console.log(
          //     "camera changed:",
          //     event.detail.center,
          //     "zoom:",
          //     event.detail.zoom
          //   )
          // }
          onClick={(e) => console.log("current coordinates ", e.detail.latLng)}
          reuseMaps={true} // allows map instance caching
          mapId={import.meta.env.VITE_GOOGLEMAPS_MAP_ID}
        >
          {markers.map((marker) => {
            return (
              <div key={marker.id}>
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
              <h2>{selectedMarker.name}</h2>
              <p>{`Project Lead: ${selectedMarker.project_lead}`}</p>
              <p>{`Project Status: ${selectedMarker.project_status}`}</p>
              <div>
                <img
                  src="https://v5.airtableusercontent.com/v3/u/45/45/1758232800000/E6g8AU05SiD7njMPiQurJA/_9IeASjJEnHZj7D3mpaTwuwAJhbOMr-niZJywsZgKeXtmNa1Bw3TzsEs7kR8m40mt11W-bQC3rFvjeQgSCb_PtS4bsTH6pW_J96iSwFfGLblCyamM-oIFnG71DPFYjiA-OZXjv2LRSWbg5Wnhp-37nXhTCpZZ4YpMAeMTPKRfwY/mB6heBdglhDCGMpC5-VNLeM2z0JTo-SHrxWmnDy4dss"
                  style={{
                    height: "100px",
                    width: "180px",
                  }}
                />
              </div>

              <button onClick={closeInfoWindow}>Close</button>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
      <ProjectsList markers={markers}/>
    </div>
  );
}

export default App;
