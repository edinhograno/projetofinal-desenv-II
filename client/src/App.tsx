import React, { useState } from "react";
import InitialPage from "./components/InitialPage";
import { createGlobalStyle } from "styled-components";
import LoggedPage from "./components/LoggedPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
`;

function App() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route
          path="/"
          element={
            isLogged ? (
              <LoggedPage />
            ) : (
              <InitialPage isLogged={isLogged} setIsLogged={setIsLogged} />
            )
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
