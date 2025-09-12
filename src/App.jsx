import "./App.css";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

function App() {
  return (
    <>
      <APIProvider
        apiKey={import.meta.env.VITE_GOOGLEMAPS_API_KEY}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <h1>Hello, world! Here is a map</h1>
        <Map
          style={{ width: "100%", height: "500px" }} // renders as width and height are 0 if not specified
          defaultZoom={16}
          region="US"
          defaultCenter={{ lat: -33.83541999632124, lng: 148.68039995561773 }}
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
        ></Map>
      </APIProvider>
    </>
  );
}

export default App;
