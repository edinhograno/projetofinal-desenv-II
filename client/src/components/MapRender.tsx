import React, { useEffect, useState } from "react";
import marker from "../img/marker.svg";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import styled from "styled-components";
import useGeoLocation from "../hooks/useGeoLocation";
import L from "leaflet";
import { baseURL } from "../types/types";
import axios from "axios";

type Type = {
  token: string;
  users: { userid: string }[];
};

type Location = {
  lat: number;
  long: number;
  userid: string;
  online: "0" | "1";
};

type UserLocations = {
  userid: string;
  locations: Array<Location>;
};

const Map = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .map-container {
    z-index: 1;
    width: 100%;
    height: 100%;
  }
`;

const markerIcon = L.icon({
  iconUrl: marker,
  iconSize: [30, 95],
});

export default function MapRender(props: Type) {
  // const location = useGeoLocation();
  const [counter, setCounter] = useState(0);
  const [location, setLocation] = useState({
    loaded: true,
    coordinates: { lat: -30.03613700605358, lng: -51.21592021931656 },
  });
  const [userLocations, setUserLocations] = useState<UserLocations[]>([]);
  const users = props.users;

  async function getLocations() {
    try {
      const $userLocations = users.map(async (user) => {
        let response = await axios.post<Location[]>(`${baseURL}/locations`, {
          userid: user.userid,
          token: props.token,
        });
        const locations = response.data;
        return { locations, userid: user.userid };
      });
      const NewUserLocations = await Promise.all($userLocations);
      setUserLocations(NewUserLocations);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getLocations();
  }, [users]);

  useEffect(() => {
    setInterval(() => {
      setCounter((state) => {
        return state + 1;
      });
    }, 1000);
  }, []);

  return (
    <Map>
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
        {userLocations.map((locationsOfUser, index) => {
          const i = counter % locationsOfUser.locations.length;
          let locationUser = locationsOfUser.locations[i];
          if (location.loaded) {
            return (
              <Marker
                key={`location-${index}`}
                icon={markerIcon}
                position={[locationUser.lat, locationUser.long]}
              >
                <Popup>{locationUser.userid}</Popup>
              </Marker>
            );
          }
        })}
      </MapContainer>
      <button
        onClick={getLocations}
        style={{ zIndex: 1000, position: "absolute", top: 0, right: 0 }}
      >
        Clique aqui
      </button>
    </Map>
  );
}
