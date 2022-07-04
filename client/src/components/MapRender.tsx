import React, { useEffect, useState } from "react";
import marker from "../img/marker.svg";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import styled from "styled-components";
import useGeoLocation from "../hooks/useGeoLocation";
import L from "leaflet";
import { baseURL } from "../types/types";
import axios from "axios";
import { setOnline, setSOS } from "../api/api";

type Type = {
  token: string;
  users: { userid: string }[];
  userid: string;
  username: string;
};

type Location = {
  lat: number;
  long: number;
  userid: string;
  locationdate: string;
  name: string;
};

const Map = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .map-container {
    z-index: 1;
    width: 100%;
    height: 100%;
  }
`;

const Buttons = styled.div`
  position: absolute;
  z-index: 10;
  bottom: 0;
  right: 0;
  /* background-color: red; */
  width: 20rem;
  height: 4rem;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .status {
    height: 100%;
    width: 55%;
    /* background-color: blue; */
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .buttons-action {
    border-radius: 2rem;
    border: none;
    background-color: #de3e33;
    color: #fff;
    cursor: pointer;
  }
  button {
    width: 35%;
    height: 70%;
  }
`;

const NotificationsButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  z-index: 25;
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: rgba(12, 12, 12, 0.4);
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
`;

const Notifications = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 20;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(12, 12, 12, 0.4);
`;

const markerIcon = L.icon({
  iconUrl: marker,
  iconSize: [30, 95],
});

export default function MapRender(props: Type) {
  // const location = useGeoLocation();
  const [notificationsShow, setNotificationsShow] = useState(false);
  const [counter, setCounter] = useState(0);
  const [location, setLocation] = useState({
    loaded: true,
    coordinates: { lat: -30.03613700605358, lng: -51.21592021931656 },
  });
  const [userLocations, setUserLocations] = useState<Location[]>([]);
  const users = props.users;

  async function getLocations() {
    try {
      const locations = await axios
        .post<Location[]>(`${baseURL}/locations`, {
          token: props.token,
        })
        .then((res) => {
          console.log("eu sou a data", res.data);
          return res.data;
        });
      setUserLocations(locations);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getLocations();
  }, [users, counter]);

  useEffect(() => {
    setInterval(() => {
      setCounter((state) => {
        return state + 1;
      });
    }, 200);
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
        {userLocations.map((location, index) => {
          return (
            <Marker
              key={`location-${index}`}
              icon={markerIcon}
              position={[location.lat, location.long]}
            >
              <Popup>{location.name}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <NotificationsButton
        onClick={() => setNotificationsShow(!notificationsShow)}
      >
        N
      </NotificationsButton>
      {notificationsShow && <Notifications></Notifications>}
      <Buttons onClick={getLocations}>
        <div className="status">
          <button
            onClick={() => {
              setOnline(props.token, props.userid, 1);
            }}
            className="buttons-action"
          >
            ON
          </button>
          <button
            onClick={() => {
              setOnline(props.token, props.userid, 0);
            }}
            className="buttons-action"
          >
            OFF
          </button>
        </div>
        <button
          onClick={() => {
            setSOS(
              props.token,
              props.userid,
              `O usuario ${props.username} gerou um pedido de SOS`
            );
          }}
          className="buttons-action"
        >
          SOS
        </button>
      </Buttons>
    </Map>
  );
}
