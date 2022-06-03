import React, { useState } from "react";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import logo from "../img/logomenu.svg";
import { MdOutlineAdd } from "react-icons/md";
import { BiRightArrow } from "react-icons/bi";
import MapRender from "./MapRender";

type Type = {
  active: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const ContainerMap = styled.div.attrs((props: Type) => ({
  active: props.active,
}))`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;

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
    height: 6rem;
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
    margin: 1rem 0 0 1rem;
    width: 40%;
    height: 3rem;
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
    height: 100vh;
    width: 100%;

    .btn-item {
      margin: 1rem 1rem 1rem 0;
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
  }
`;

export default function LoggedPage() {
  const [active, setIsActive] = useState(false);

  return (
    <ContainerMap active={active}>
      <div className="container-menu">
        <header className="container-header">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
        </header>
        <button className="add-circle">
          <MdOutlineAdd className="icon" />
          Novo Círculo
        </button>
        <div className="menu-item">
          <button onClick={() => setIsActive(!active)} className="btn-item">
            <BiRightArrow className="icon" />
            Meus Círculos
          </button>
        </div>
      </div>
      <MapRender />
    </ContainerMap>
  );
}
