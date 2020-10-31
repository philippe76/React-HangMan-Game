import React, { useState, useRef } from "react";
import words from "../words";


const Game = () => {

  const [good_letters, setGood_letters] = useState([]);
  const [bad_letters, setBad_letters] = useState([]);

  // update hangman background url
  const picRef = useRef('0')
  const hangman = {
    background: `url(${require(`../img/hangman${picRef.current}.png`)}) center`
  }

  const handleChange = (e) => {
    
    const word_to_find = [...words[0]];
    const value = e.target.value.toUpperCase();

    

    // fill good or bad letters arrays
    word_to_find.includes(value) ? 
    setGood_letters((previous) => {
      return [...previous, value];
    }) :
    setBad_letters((previous) => {
      return [...previous, value];
    })

    if (!word_to_find.includes(value)) {
      picRef.current = bad_letters.length+1;
    }
    

    // set red or green input outline depending on letter
    document.querySelector("input").style.boxShadow = word_to_find.includes(value) ? "0px 0px 2px 2px green" : "0px 0px 2px 2px red";

  };



  // reset input field and color 400ms after keyup
  const resetInput = () => {
    setTimeout(() => (document.querySelector("input").value = ""), 400);
    setTimeout(() => (document.querySelector("input").style.boxShadow = ""), 400);
  };




  return (
    <>
      <div className="mx-5 d-flex justify-content-around flex-wrap">
        {[...words[0]].map((item, index) => {
          return good_letters.includes(item) ? (
            <span key={index} className="guess-letters">
              {item}
            </span>
          ) : (
            <span key={index} className="guess-letters">
              ___
            </span>
          );
        })}
      </div>
      <div>
      </div>
      <section className="gameBoard">
        <div className="userZone">
            <p > TRY A LETTER :</p>
            <input
              type="text"
              autoFocus
              maxLength="1"
              name="letter"
              onChange={handleChange}
              onKeyUp={resetInput}
            />         
            <div className="UsedLetters">
              {/* <Tries alreadyTried={this.state.alreadyTried} /> */}
            </div>  
        </div>
        <div className="hangZone" style={hangman} >
          
          {/* <div style={hangman} id="hangman" className="col-5"></div> */}
        </div>
      </section>
    </>
  );
};

export default Game;
