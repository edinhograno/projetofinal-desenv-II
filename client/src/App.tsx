import React from "react";
import InitialPage from "./components/InitialPage";
import { createGlobalStyle } from "styled-components";
import LoggedPage from "./components/LoggedPage";

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
      <LoggedPage />
    </>
  );
}

export default App;
