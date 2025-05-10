import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';

function Sitemap() {
  const [position, setPosition] = useState([40.7128, -74.0060]); // Default position (New York)
  const [locationName, setLocationName] = useState("New York City"); // Default name
  const searchInputRef = useRef();

  // Geocode the location (e.g., state) and update the map position
  const handleSearch = () => {
    const geocoder = L.Control.Geocoder.nominatim();
    const address = searchInputRef.current.value.trim();

    // If no input, show an alert
    if (address === "") {
      alert("Please enter a location to search.");
      return;
    }

    geocoder.geocode(address, function(results) {
      if (results && results.length > 0) {
        const latLng = results[0].center;
        setPosition([latLng.lat, latLng.lng]); // Update position
        setLocationName(results[0].name || "Unknown location"); // Update the location name in the popup
      } else {
        alert("Location not found! Please try another search.");
      }
    });
  };

  return (
    <div>
      <h1>Sitemap</h1>

      {/* Search Box */}
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search for a location (e.g., Bihar)"
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '20px',
          border: '1px solid #ccc',
          borderRadius: '5px',
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: '10px',
          marginTop: '10px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Search
      </button>

      {/* Display OpenStreetMap using react-leaflet */}
      <MapContainer center={position} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            {locationName}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Sitemap;
