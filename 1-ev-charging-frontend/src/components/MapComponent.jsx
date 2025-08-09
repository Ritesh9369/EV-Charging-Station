import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../styles/map.css";
import evMarker from "../assets/ev-marker.png";

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: evMarker,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -40]
});

const MapComponent = ({ stations, searchLocation }) => {
  const [position, setPosition] = useState([19.076, 72.8777]); // Default Mumbai location

  useEffect(() => {
    if (searchLocation) {
      // Convert location to coordinates (Dummy logic, replace with API call)
      const locationCoordinates = {
        Mumbai: [19.076, 72.8777],
        Delhi: [28.7041, 77.1025],
        Pune: [18.5204, 73.8567]
      };
      setPosition(locationCoordinates[searchLocation] || position);
    }
  }, [searchLocation]);

  return (
    <MapContainer center={position} zoom={12} className="map-container">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* EV Stations Markers */}
      {stations.map((station) => (
        <Marker
          key={station.id}
          position={[station.lat, station.lng]}
          icon={customIcon}
        >
          <Popup>
            <strong>{station.name}</strong> <br />
            {station.address} <br />
            Price: ₹{station.price} / hour
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
