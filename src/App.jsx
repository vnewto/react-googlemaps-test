import "./App.css";
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";

function App() {
  return (
    <>
      <APIProvider
        apiKey={import.meta.env.VITE_GOOGLEMAPS_API_KEY}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <h1>Hello, world!</h1>
      </APIProvider>
    </>
  );
}

export default App;
