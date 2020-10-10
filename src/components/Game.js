import React, { useState } from "react";
// import Letters from "./Letters";
import words from "../words";

const Game = () => {
  //   const hangman = {
  //     background: `url(${hangman0}) no-repeat`,
  //     backgroundPosition: "-250px -55px",
  //     marginTop: "100px",
  //     height: "31rem",
  //     width: "25rem",
  //     position: "relative",
  //     "z-index": 20,
  //   };

  const [good_letters, setGood_letters] = useState([]);

  const handleChange = (e) => {
    const word_to_find = [...words[0]];
    // console.log(word_to_find);
    const value = e.target.value.toUpperCase();
    setGood_letters((previous) => {
      return [...previous, value];
    });
    // console.log(good_letters);

    document.querySelector("input").style.boxShadow = word_to_find.includes(
      value
    )
      ? "0px 0px 4px green"
      : "0px 0px 4px red";
  };

  const resetInput = () => {
    // resets the input's field 400ms after keyup
    setTimeout(() => (document.querySelector("input").value = ""), 400);
  };

  return (
    <>
      <div className="mx-5 d-flex justify-content-around flex-wrap">
        {/* {this.displayLetters()} */}
        {[...words[0]].map((item, index) => {
          return good_letters.includes(item) ? (
            <span key={index} className="guess-letters">
              {item}
            </span>
          ) : (
            <span key={index} className="guess-letters">
              _
            </span>
          );
        })}
      </div>
      <div>
        {/* {this.winnerDance()} */}
        {/* {this.looserDance()} */}
      </div>
      <div className="row">
        <div className="col-6 guess-div">
          <div className="row">
            <label className="col-3 mt-5 pl-5 pt-1 guess-label">
              Try a letter :{" "}
            </label>
            <input
              type="text"
              autoFocus
              className="form-control col-1 mt-5"
              maxLength="1"
              name="letter"
              onChange={handleChange}
              onKeyUp={resetInput}
            />
          </div>
          <div className="row m-5">
            {/* <Tries alreadyTried={this.state.alreadyTried} /> */}
          </div>
        </div>
        {/* <div style={hangman} id="hangman" className="col-5"></div> */}
      </div>
    </>
  );
};

export default Game;
