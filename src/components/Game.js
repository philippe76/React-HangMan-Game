import React, { useState, useRef, useEffect } from "react";
import words from "../words";
import Tries from './Tries';
import randomWords from 'random-words';


const Game = () => {

  const [wordData, setwordData] = useState({
    good_letters: [],
    bad_letters: [],
    word: words[0],
    word_index: 0,
    found_count: 0,
    game_over: false
  })

  // CREATE REF FOR HANGMAN PICS
  const picRef = useRef('0')
  const hangman = {
    background: `url(${require(`../img/hangman${picRef.current}.png`)})  center`
  }


  // RESET GAME FUNCTION
  const reset = () => {

    // fetching new word
    setwordData(prevState => ({
      ...prevState,
      word: randomWords().toUpperCase()
    }))

    // let URL = 'https://random-word-api.herokuapp.com/word?number=10&swear=1'

    // const fetchWord = async() =>{
    //   return (await fetch(URL)).json();
    // }
    // const getWord = () => {
    //   fetchWord().then( result => {
    //     setwordData(prevState => ({
    //       ...prevState,
    //       word: result[0].toUpperCase()
    //     }))
    //   })
    // }
    // getWord();  
      
    // reset state bindings
    setwordData(prevState => ({
      ...prevState,
      good_letters: [],
      bad_letters: [],
      found_count:0
    }))

    document.querySelectorAll('.letters').forEach(item=> item.classList.remove('blink'));   
    document.querySelector('.word').style.backgroundColor ='white';
    document.querySelector('.word').style.color ='black';
  }


  // ------- HANDLECHANGE METHOD -------------- //
  const handleChange = (e) => {
     
    // find matching letters
    const current_letter = e.target.value.toUpperCase();     
    const matching = wordData.word.match(new RegExp(`${current_letter}`, "g"));

    // update good_letters array & found_count
    if(matching && !wordData.good_letters.includes(current_letter)){      
      setwordData((prevState) => ({
        ...prevState, 
        good_letters: [...wordData.good_letters , current_letter]   
      }))
      setwordData(prevState => ({
        ...prevState,
        found_count: wordData.found_count + matching.length
      })) 
    }

     // update bad letters array 
    if(!matching && !wordData.bad_letters.includes(current_letter)){    
      setwordData((prevState) => ({
        ...prevState, 
        bad_letters: [...wordData.bad_letters , current_letter]   
      }))
    }    

    // update hangman background url
    picRef.current = !matching ? wordData.bad_letters.length+1 : picRef.current 

    // set 'red' or 'green' input outline depending on letter
    document.querySelector("input").style.boxShadow = matching ? "0px 0px 2px 2px green" : "0px 0px 2px 2px red";
  };



  // SUCCESS LOGIC
  if (wordData.found_count === wordData.word.length && wordData.game_over === false) {
    document.querySelectorAll('.letters').forEach(item=> item.classList.add('blink'));       
    document.querySelector('.word').style.backgroundColor ='#424a52'; 

    // update logic game for a new word
    setTimeout(() => {
      reset();
    }, 3000);  
  }


  // REMOVE HANGMAN PIC
  useEffect(()=>{
    if((wordData.found_count === wordData.word.length && wordData.game_over === false) || picRef.current === 8) {
      picRef.current = 0;
    }
  }, [wordData.word.length,wordData.found_count, wordData.game_over])



  // ------- LOSING GAME LOGIC -------------- //
  if (picRef.current === 8) {  

    // display unfound word
    const letters = [...document.querySelectorAll('.letters')];
    for (let i=0; i<letters.length; i++){
      letters[i].style.display = 'inline'
      letters[i].innerHTML = wordData.word[i];
    }

    // display Game Over
    setTimeout(() => {   

      setwordData(prevState => ({
        ...prevState,
        game_over: !wordData.game_over
      }))      
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

      setwordData(prevState => ({
        ...prevState,
        game_over: false
      }))         
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
         {[...wordData.word].map((item, index) => {
          return wordData.good_letters.includes(item) ? (
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
            <Tries alreadyTried={wordData.bad_letters} />
        </div>
        <div className="hangZone" style={hangman}></div>
      </section>
    </>
  );
};

export default Game;
