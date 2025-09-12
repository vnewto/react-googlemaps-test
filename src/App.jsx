import "./App.css";
import {
  APIProvider,
  Map,
} from "@vis.gl/react-google-maps";

function App() {
  return (
    <>
      <APIProvider
        apiKey={import.meta.env.VITE_GOOGLEMAPS_API_KEY}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <h1>Hello, world!</h1>
        <Map
          style={{ width: '100%', height: '400px' }}
          defaultZoom={16}
          defaultCenter={{ lat: -33.83541999632124, lng: 148.68039995561773 }}
          onCameraChanged={(event) =>
            console.log(
              "camera changed:",
              event.detail.center,
              "zoom:",
              event.detail.zoom
            )
          }
        ></Map>
      </APIProvider>
    </>
  );
}

export default App;
