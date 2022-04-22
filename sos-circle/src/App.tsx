import React from "react";
import InitialPage from "./components/InitialPage";
import { createGlobalStyle } from "styled-components";

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
      <InitialPage />
    </>
  );
}

export default App;
