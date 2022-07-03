import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
// eslint-disable-line
import logo from "../img/logomenu.svg";
import { MdFormatListNumbered, MdOutlineAdd } from "react-icons/md";
import { BiRightArrow } from "react-icons/bi";
import MapRender from "./MapRender";
import NewCircle from "./NewCircle";
import { enterCircle } from "../api/api";
import getCircles from "../hooks/getCirles";
import axios from "axios";
import { baseURL } from "../types/types";

const ContainerMap = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  font-family: "Poppins", sans-serif;

  .container-menu {
    left: 0;
    top: 0;
    z-index: 2;
    position: absolute;
    width: 25%;
    background-color: #fff;
    height: 100vh;
    max-width: 320px;
    display: flex;
    flex-direction: column;
    box-shadow: 2px 3px 10px #e0e0e0;
  }
  .container-header {
    height: 10vh;
    padding: 1rem 0.5rem;
    display: flex;
    border-bottom: 1px solid #ececec;

    .logo {
      width: 100%;
      height: 100%;

      img {
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .add-circle {
    margin: 1rem 0 1rem 1rem;
    width: 40%;
    height: 5vh;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: #fff;
    border: 1px solid #ececec;
    box-shadow: 2px 2px 5px #ececec;
    color: #6b6b6b;
    transition: all 0.3s ease-in-out;

    &:hover {
      box-shadow: 4px 4px 10px #cccccc;
      background-color: #ececec;
      color: #de3e33;

      .icon {
        color: #de3e33;
      }
    }

    .icon {
      font-size: 2rem;
      color: #4273b9;
    }
  }
  .menu-item {
    height: 65vh;
    width: 100%;
    overflow: hidden;

    .btn-item {
      margin: 0 1rem 0 0;
      width: 95%;
      height: 3rem;
      border-top-right-radius: 2rem;
      border-bottom-right-radius: 2rem;
      display: flex;
      align-items: center;
      font-size: 1rem;
      border: none;
      font-weight: 600;
      background-color: #fff;
      transition: all 0.3s ease-in-out;
      color: #185abc;
      cursor: pointer;
      position: relative;
      overflow: hidden;

      .icon {
        margin: 0 0.5rem;
        color: #666666;
        transition: all 0.3s ease-in-out;
        transform: ${(props) =>
          props.active ? "rotate(90deg)" : "rotate(0deg)"};
      }

      &:before {
        content: "";
        position: absolute;
        background-color: rgba(66, 115, 185, 0.2);
        top: 0;
        left: ${(props) => (props.active ? "0" : "-100%")};
        width: 100%;
        height: 100%;
        transition: all 0.3s ease-in-out;
      }
      &:hover {
        &:before {
          left: 0;
        }
      }
    }
    .list-circles {
      height: 100%;
      width: 100%;
      ul {
        height: auto;
        width: 100%;
        /* background-color: green; */
      }
      li {
        width: 95%;
        height: 3rem;
        display: flex;
        align-items: center;
        padding: 0 1rem;
        position: relative;
        border-top-right-radius: 2rem;
        border-bottom-right-radius: 2rem;
        margin: 0 1rem 0 0;
        background-color: #fff;
        transition: all 0.1s ease-in-out;
        cursor: pointer;

        &:hover {
          background-color: rgba(66, 115, 185, 0.2);
        }
      }

      li.active {
        background-color: #de3e33;
        color: #fff;
      }
    }
  }
  .join-circle {
    /* background-color: blue; */
    border-top: 1px solid #ececec;
    height: 20vh;
    display: flex;
    flex-direction: column;
    padding: 1rem;

    label {
      font-size: 1.1rem;
      color: #333;
    }

    input {
      position: relative;
      max-width: 380px;
      width: 100%;
      height: 45px;
      margin: 10px 0;
      border-radius: 55px;
      padding: 0 0.8rem;
      border: none;
      background-color: rgba(66, 115, 185, 0.2);
      outline: none;
      line-height: 1;
      font-weight: 600;
      font-size: 1.1rem;
      color: #185abc;

      &::placeholder {
        color: #185abc;
      }
    }
    button {
      width: 120px;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 49px;
      cursor: pointer;
      background-color: #4273b9;
      color: #fff;
      text-transform: uppercase;
      font-weight: 600;
      margin: 10px 0;
      transition: 0.5s;
    }
  }
`;

export default function LoggedPage() {
  const [active, setIsActive] = useState(false);
  const [newCircle, setNewCircle] = useState(false);
  const [userid, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [token, setToken] = useState("");
  const [circleList, setCircleList] = useState();
  const [selectedCircle, setSelectedCircle] = useState({
    token: "",
    selected: "",
    users: {},
  });

  useEffect(() => {
    const userdata = localStorage.getItem("userdata");
    const parsed = JSON.parse(userdata);
    const userid = parsed[2];
    const username = parsed[0];

    if (userdata) {
      setUserId(userid);
      setUserName(username);
    }
    async function getCircles() {
      try {
        await axios
          .post(`${baseURL}/circles`, { userid: userid })
          .then((res) => {
            setCircleList(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    }
    getCircles();
  }, []);

  async function getUsersCircleList() {
    await axios
      .post(`${baseURL}/circlesuserlist`, { token: selectedCircle.token })
      .then((res) => {
        setSelectedCircle({ ...selectedCircle, users: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getUsersCircleList();
  }, [selectedCircle.selected]);

  return (
    <ContainerMap>
      <div className="container-menu">
        <header className="container-header">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
        </header>
        <button onClick={() => setNewCircle(true)} className="add-circle">
          <MdOutlineAdd className="icon" />
          Novo Círculo
        </button>
        {newCircle && (
          <NewCircle
            newCircle={newCircle}
            setNewCircle={setNewCircle}
            userid={userid}
          />
        )}
        <div className="menu-item">
          <button
            onClick={() => {
              setIsActive(!active);
            }}
            className="btn-item"
          >
            <BiRightArrow className="icon" />
            Meus Círculos
          </button>
          {active && (
            <div className="list-circles">
              <ul>
                {circleList?.map(
                  (list: { name: string; token: string }, index: string) => {
                    return (
                      <li
                        key={`circle-${index}`}
                        onClick={() => {
                          setSelectedCircle({
                            ...selectedCircle,
                            selected: `circle-${index}`,
                            token: list.token,
                          });
                        }}
                        className={`${
                          selectedCircle.selected === `circle-${index}`
                            ? "active"
                            : ""
                        }`}
                      >
                        {list.name}
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          )}
        </div>
        <div className="join-circle">
          <label>Entre no círculo</label>
          <input
            onChange={(e) => {
              setToken(e.target.value);
            }}
            type="text"
            placeholder="Digite o código"
          />
          <button
            onClick={() => {
              enterCircle(token, userid, 0);
            }}
          >
            Entrar
          </button>
        </div>
      </div>
      <MapRender
        token={selectedCircle.token}
        users={selectedCircle.users}
        userid={userid}
        username={userName}
      />
    </ContainerMap>
  );
}
