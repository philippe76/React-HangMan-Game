import React, { useState, useRef, useEffect } from "react";
import words from "../words";
import Tries from './Tries'


const Game = () => {

  const [good_letters, setGood_letters] = useState([]);
  const [bad_letters, setBad_letters] = useState([]);
  const [word_index, setWord_index] = useState(0);
  const [found_count, setFound_count] = useState(0);
  const [game_over, setGame_over] = useState(false);
  const [word, setWord] = useState(words[`${word_index}`])

  // IMPORT WORD TO FIND
  // let word = words[`${word_index}`]

  // CREATE REF FOR HANGMAN PICS
  const picRef = useRef('0')
  const hangman = {
    background: `url(${require(`../img/hangman${picRef.current}.png`)})  center`
  }


  // RESET GAME FUNCTION
  const reset = () => {
    // if last word : go back to first one
    if (word_index !== words.length-1) {
      setWord_index(word_index+1);
    }
    else {
      // setWord_index(0)

      // fetching new word
      let URL = 'https://random-word-api.herokuapp.com/word?number=10'

      const fetchWord = async() =>{
        return (await fetch(URL)).json();
      }
      const getWord = () => {
        fetchWord().then( result => setWord(result[0].toUpperCase()))
      }
      getWord();
      
    }
   
    setGood_letters([]);
    setBad_letters([]);
    setFound_count(0);
    document.querySelectorAll('.letters').forEach(item=> item.classList.remove('blink'));   
    document.querySelector('.word').style.backgroundColor ='white';
    document.querySelector('.word').style.color ='black';

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

    
    // set 'red' or 'green' input outline depending on letter
    document.querySelector("input").style.boxShadow = matching ? "0px 0px 2px 2px green" : "0px 0px 2px 2px red";
  };




  // WHEN WORD IS FOUND
  if (found_count === word.length && game_over === false) {
    document.querySelectorAll('.letters').forEach(item=> item.classList.add('blink'));       
    document.querySelector('.word').style.backgroundColor ='#424a52'; 

    // update logic game for a new word
    setTimeout(() => {
      reset();
    }, 3000);  
  }


  // REMOVE HANGMAN PIC
  useEffect(()=>{
    if((found_count === word.length && game_over === false) || picRef.current === 8) {
      picRef.current = 0;
    }
  }, [word.length,found_count, game_over])



  // ------- LOSING GAME LOGIC -------------- //
  if (picRef.current === 8) {  

    // display unfound word
    const letters = [...document.querySelectorAll('.letters')];
    for (let i=0; i<letters.length; i++){
      letters[i].style.display = 'inline'
      letters[i].innerHTML = word[i];
    }

    // display Game Over
    setTimeout(() => {   
      setGame_over(!game_over);       
      document.querySelector('.word').style.background = 'black';
      document.querySelector('.word').style.color = '#dc3545';   
      document.querySelectorAll('.letters').forEach(item => {
        item.innerHTML = ''
        item.style.display = 'none'
      })
      document.querySelector('.game-over').style.display = 'block'
      
    },1000)

    // reset game board for next word 
    setTimeout(() => {
      document.querySelector('.game-over').style.display = 'none';
      setGame_over(false);           
      reset(); 
      document.querySelectorAll('.letters').forEach(item => {
        item.style.display = 'inline';
        item.innerHTML = '_'
      })  
    }, 2500);      
  }



  // RESEST INPUT AFTER KEYUP
  const resetInput = () => {
    setTimeout(() => (document.querySelector("input").value = ""), 400);
    setTimeout(() => (document.querySelector("input").style.boxShadow = ""), 400);
  };


  // ------- COMPONENT RETURN -------------- //
  return (
    <>
      <div className="mx-5 d-flex justify-content-around flex-wrap word">   
        <h1 className="game-over">GAME OVER</h1>
         {[...word].map((item, index) => {
          return good_letters.includes(item) ? (
            <span key={index} className="letters">
              {item}
            </span>
          ) : (
            <span key={index} className="letters">
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
