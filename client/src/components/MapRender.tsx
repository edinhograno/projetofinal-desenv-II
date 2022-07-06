import React, { useEffect, useState } from "react";
import sireneAnimation from "../animations/sirene.json";
// @ts-ignore: Unreachable code error
import marker from "../img/marker.svg";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import styled from "styled-components";
// import useGeoLocation from "../hooks/useGeoLocation";
import L from "leaflet";
import { baseURL } from "../types/types";
import axios from "axios";
import { setOnline, setSOS } from "../api/api";
import Alert from "@mui/material/Alert";
import Lottie from "react-lottie";

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

type UserHelp = {
  name: string;
  userid: string;
  token: string;
  socialdate: string;
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

const Notifications = styled.div`
  display: flex;
  width: auto;
  height: auto;
  z-index: 20;
  position: absolute;
  top: 0;
  left: 50%;
  background-color: rgb(253, 237, 237);
`;

const markerIcon = L.icon({
  iconUrl: marker,
  iconSize: [30, 95],
});

export default function MapRender(props: Type) {
  // const location = useGeoLocation();
  const [help, setHelp] = useState<UserHelp[]>([]);
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
          return res.data;
        });
      setUserLocations(locations);
    } catch (err) {
      console.log(err);
    }
  }

  async function userAskingHelp() {
    const data = await axios.post<UserHelp[]>(`${baseURL}/usersaskinghelp`, {
      token: props.token,
    });
    setHelp(data.data);
  }

  useEffect(() => {
    getLocations();
    userAskingHelp();

    if (help) {
      help.map((user) => {
        const datePostGres = new Date(user.socialdate).getTime();
        const dateNow = Date.now() + 3 * 60 * 60 * 1000;
        const dateFinal = (dateNow - datePostGres) / 1000;

        if (dateFinal === 20 || dateFinal > 20) {
          axios.post<UserHelp[]>(`${baseURL}/removesos`, {
            token: user.token,
            userid: user.userid,
          });
        }
      });
    }
  }, [counter]);

  useEffect(() => {
    setInterval(() => {
      setCounter((state) => {
        return state + 1;
      });
    }, 2000);
  }, []);

  const animation = {
    loop: true,
    autoplay: true,
    animationData: sireneAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

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

      {help && (
        <Notifications>
          {help.map((person, index) => {
            if (props.token === person.token) {
              return (
                <>
                  <Alert key={`user-${index}`} severity="error">
                    O usuário {person.name} está pedindo ajuda!
                  </Alert>
                  <Lottie style={{ width: 50 }} options={animation} />
                </>
              );
            }
          })}
        </Notifications>
      )}

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
            setSOS(props.token, props.userid);
          }}
          className="buttons-action"
        >
          SOS
        </button>
      </Buttons>
    </Map>
  );
}
