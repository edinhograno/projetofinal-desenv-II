import React from "react";
import InitialPage from "./components/InitialPage";
import { createGlobalStyle } from "styled-components";
import LoginComponent from "./components/LoginComponent";

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      {/* <InitialPage /> */}
      <LoginComponent />
    </>
  );
}

export default App;
