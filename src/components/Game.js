import React, { useState, useRef } from "react";
import words from "../words";
import Tries from './Tries'


const Game = () => {

  // set logic game state
  const [good_letters, setGood_letters] = useState([]);
  const [bad_letters, setBad_letters] = useState([]);
  const [word_index, setWord_index] = useState(0)
  const [found_count, setFound_count] = useState(0)

  // import word to find
  const word = words[`${word_index}`]

  // create ref for hangman background url
  const picRef = useRef('0')
  const hangman = {
    background: `url(${require(`../img/hangman${picRef.current}.png`)})  center`
  }


  // ------- HANDLECHANGE METHOD -------------- //
  const handleChange = (e) => {
     
    // find matching letters
    const current_letter = e.target.value.toUpperCase();     
    const matching = word.match(new RegExp(`${current_letter}`, "g"));

    // update good_letters array & found_count
    if(matching && !good_letters.includes(current_letter)){      
      setGood_letters((previous) => {
        return [...previous, current_letter];   
      })
      setFound_count(found_count + matching.length )      
    }

     // update bad letters array 
    if(!matching && !bad_letters.includes(current_letter)){    
      setBad_letters((previous) => {
        return [...previous, current_letter];   
      })
    }    

    // update hangman background url
    picRef.current = !matching ? bad_letters.length+1 : picRef.current 
    
    // set red or green input outline depending on letter
    document.querySelector("input").style.boxShadow = matching ? "0px 0px 2px 2px green" : "0px 0px 2px 2px red";

  };
  // ------- end handleChange() -------------- //


  // when word is found
  console.log(found_count + '/' + word.length ); 
  if (found_count === word.length) {
    document.querySelectorAll('.guess-letters').forEach(item=> item.classList.add('blink'));   
    document.querySelector('.word').style.backgroundColor ='#424a52';   
    // document.querySelector('.word').style.backgroundColor ='#343a40';  
  }


  // reset input field and color 400ms after keyup
  const resetInput = () => {
    setTimeout(() => (document.querySelector("input").value = ""), 400);
    setTimeout(() => (document.querySelector("input").style.boxShadow = ""), 400);
  };


  return (
    <>
      <div className="mx-5 d-flex justify-content-around flex-wrap word">   
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
            <p>TRY A LETTER :</p>
            <input
              type="text"
              autoFocus
              maxLength="1"
              name="letter"
              onChange={handleChange}
              onKeyUp={resetInput}
            />                             
            <Tries alreadyTried={bad_letters} />
        </div>
        <div className="hangZone" style={hangman}></div>
      </section>
    </>
  );
};

export default Game;
