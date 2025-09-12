import { useMap } from "@vis.gl/react-google-maps";

export default function CreateCenterControl(map) {
  const chicago = { lat: 41.85, lng: -87.65 };
  const mapBox = useMap();

  const handleCenterClick = () => {
    if (mapBox) {
      mapBox.setCenter(chicago);
    }
  };

  return (
    <button
      onClick={handleCenterClick}
      style={{
        backgroundColor: "#fff",
        border: "2px solid #fff",
        borderRadius: "3px",
        boxShadow: "0 2px 6px rgba(0,0,0,.3)",
        color: "rgb(25,25,25)",
        cursor: "pointer",
        fontFamily: "Roboto,Arial,sans-serif",
        fontSize: "16px",
        lineHeight: "38px",
        margin: "8px 0 22px",
        padding: "0 5px",
        textAlign: "center",
      }}
      title="Click to recenter the map"
    >
      Center Map
    </button>
  );
}
