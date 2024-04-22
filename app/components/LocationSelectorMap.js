'use client'

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const LocationSelectorMap = ({ onLocationSelect = () => {}, initialLat, initialLng }) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
    if (!isClient) {
      return;
    }
    
    const setUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMarkerPosition([latitude, longitude]);
          if (onLocationSelect) {
            onLocationSelect(latitude, longitude);
          }
        },
        () => {
          console.log('Unable to retrieve your location');
        }
      );
    };

    if (initialLat && initialLng) {
      setMarkerPosition([initialLat, initialLng]);
    } else {
      setUserLocation();
    }
  }, [initialLat, initialLng, onLocationSelect, isClient]);

  function LocationMarker({ position }) {
    const map = useMap();
  
    useEffect(() => {
      if (position) {
        map.flyTo(position, map.getZoom());
      }
    }, [position, map]);
  
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        if (onLocationSelect) {
          onLocationSelect(lat, lng);
        }
      },
    });
  
    return position === null ? null : (
      <Marker position={position} icon={customMarkerIcon}></Marker>
    );
  }

  return (
    <MapContainer center={markerPosition || [10.0159, -84.2142]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker position={markerPosition} />
    </MapContainer>
  );
};

export default LocationSelectorMap;

