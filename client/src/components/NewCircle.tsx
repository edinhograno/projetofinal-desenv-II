import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { newCircle } from "../api/api";

type Type = {
  newCircle: boolean;
  setNewCircle: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewCircleContainer = styled.div`
  position: absolute;
  z-index: 15;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.1);

  .new-circle {
    z-index: 20;
    position: absolute;
    width: 300px;
    height: auto;
    background-color: #eee;
    left: 12rem;
    top: 6rem;
    padding: 1rem;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 5px 3px 8px #3a3a3a78;

    &:before {
      position: absolute;
      left: -20px;
      top: 10px;
      transform: rotate(45deg);
      content: "";
      width: 40px;
      height: 40px;
      background-color: #eee;
      box-shadow: -5px 5px 5px #3a3a3a29;
      z-index: -1;
    }
  }
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 1rem;

    h3 {
      font-size: 1.2rem;
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
    .btns {
      display: flex;
      justify-content: space-around;

      button {
        width: 110px;
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
  }
`;

export default function NewCircle(props: Type) {
  const [circleData, setCircleData] = useState({
    circlename: "",
    owneruserid: "",
    token: "",
  });

  useEffect(() => {
    const userdata = localStorage.getItem("userdata");
    const parsed = JSON.parse(userdata);
    const owneruserid = parsed[2];
    const token = Math.random().toString(36).substr(2, 6).toUpperCase();
    if (userdata) {
      setCircleData({ ...circleData, owneruserid: owneruserid, token: token });
      console.log(circleData);
    }
  }, []);

  return (
    <NewCircleContainer
      onClick={() => {
        props.setNewCircle(false);
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="new-circle"
      >
        <div className="content">
          <h3>Qual o nome do círculo?</h3>
          <input
            onChange={(e) => {
              setCircleData({ ...circleData, circlename: e.target.value });
            }}
            type="text"
            placeholder=""
          />
          <div className="btns">
            <button
              onClick={() =>
                newCircle(
                  circleData.circlename,
                  circleData.owneruserid,
                  circleData.token
                )
              }
            >
              Criar
            </button>
            <button
              onClick={() => {
                props.setNewCircle(false);
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </NewCircleContainer>
  );
}
