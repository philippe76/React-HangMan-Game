import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Game from "./components/Game";

const App = () => {
  return (
    <>
      <div className="jumbotron bg-dark">
        <h1 className="display-4 text-center text-white font-weight-normal">
          The HangMan Game
        </h1>
      </div>

      <Game />

    </>
  );
};

export default App;
