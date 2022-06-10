import React, { useEffect } from "react";
import marker from "../img/marker.svg";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import styled from "styled-components";
import useGeoLocation from "../hooks/useGeoLocation";
import L from "leaflet";

const Map = styled.div`
  width: 100%;
  height: 100%;

  .map-container {
    z-index: 1;
    width: 100%;
    height: 100%;
  }
`;

export default function MapRender() {
  const location = useGeoLocation();
  const markerIcon = L.icon({
    iconUrl: marker,
    iconSize: [30, 95],
  });

  return (
    <Map>
      {location.loaded ? (
        <MapContainer
          className="map-container"
          center={{
            lat: location.coordinates.lat,
            lng: location.coordinates.lng,
          }}
          zoom={15}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            icon={markerIcon}
            position={[location.coordinates.lat, location.coordinates.lng]}
          >
            <Popup>Achoooou!</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <div>Loading...</div>
      )}
    </Map>
  );
}
