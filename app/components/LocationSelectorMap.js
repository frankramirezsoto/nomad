'use client'

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const LocationSelectorMap = ({ onLocationSelect, initialLat, initialLng }) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  // Define the icon with correct paths
const customMarkerIcon = new L.Icon({
    iconUrl: '/assets/images/marker-icon.png',
    iconRetinaUrl: '/assets/images/marker-icon-2x.png',
    shadowUrl: '/assets/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  useEffect(() => {
    // Function to set the marker to the user's current location
    const setUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMarkerPosition([latitude, longitude]);
          onLocationSelect(latitude, longitude); // Update the formData with user's location
        },
        () => {
          // Handle error or fallback if permission is denied
          console.log('Unable to retrieve your location');
        }
      );
    };

    // If initial coordinates are provided, use them; otherwise, try to use the user's location
    if (initialLat && initialLng) {
      setMarkerPosition([initialLat, initialLng]);
    } else {
      setUserLocation();
    }
  }, [initialLat, initialLng, onLocationSelect]);

  function LocationMarker({ position, onLocationSelect }) {
    const map = useMap();
  
    useEffect(() => {
      if (position) {
        map.flyTo(position, map.getZoom());
      }
    }, [position, map]);
  
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        onLocationSelect(lat, lng);
      },
    });
  
    return position === null ? null : (
      <Marker position={position} icon={customMarkerIcon}></Marker>
    );
  }

  return (
    <MapContainer center={markerPosition || [10.0159, -84.2142]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker position={markerPosition} onLocationSelect={onLocationSelect} />
    </MapContainer>
  );
};

export default LocationSelectorMap;
