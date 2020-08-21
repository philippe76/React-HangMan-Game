import React, { Component } from 'react';
import Tries from './Tries';
import hangman0 from './img/hangman0.png'
import hangman1 from './img/hangman1.png'
import hangman2 from './img/hangman2.png'
import hangman3 from './img/hangman3.png'
import hangman4 from './img/hangman4.png'
import hangman5 from './img/hangman5.png'
import hangman6 from './img/hangman6.png'
import hangman7 from './img/hangman7.png'
import hangman8 from './img/hangman8.png'



const divStyle= {
    marginTop: '100px'
} 
const labelStyle= {
    fontSize: '1.2rem'
}
const spanStyle= {
    border: '1px solid grey',
    fontSize: '2rem',
    fontWeight: 'bolder',
    margin: '1rem',
    padding: '1rem'
}
const btnStyle= {
    height: 40,
    marginTop: 50,
    marginLeft: 40
}

const hangman = {
    background: `url(${ hangman0 }) no-repeat`,
    backgroundPosition: '-250px -55px',
    marginTop: '100px',
    height: '31rem',
    width: '25rem',
    position: 'relative',
    'z-index': 20
}





class User extends Component {
  
    state = { 
        words: ['ANIMAL','LOUP', 'AISHA','ECOLE','ALPHABETIQUE', 'MAGNESIUM', 'STUPEFACTION', 'CONTINENT', 'MAYONNAISE', 'LANOUGADERE', 'JAVASCRIPT', 'BOOTSTRAP', 'INTELLIGENCE'],
        wordToFindState: [],
        curentLetter: [],
        goodletter: [],
        errorCount: [],
        alreadyTried: [],
        hangTab: [hangman0, hangman1, hangman2, hangman3, hangman4, hangman5, hangman6, hangman7, hangman8]
    }


    handleChange = (e) => {  

        const {words, curentLetter, alreadyTried, goodletter, hangTab, errorCount} = this.state;
        const curentLetterCloned = curentLetter;
        const goodletterCloned = goodletter;
        const alreadyTriedCloned = alreadyTried;
        const errorCountCloned = errorCount;
        const hangTabCloned2 = hangTab;
        let hangTabCloned;
        
        const wordToFind = [...words[0]];          
       


        curentLetterCloned.push(e.target.value);   // fulls in an array with the current letter

        if (e.target.value !== '' && !alreadyTried.includes(e.target.value )){      // fulls in an array with the previous tried letter and so avoid already tried letter  
                alreadyTriedCloned.push(e.target.value)
        }


        if(wordToFind.includes(e.target.value.toUpperCase())){   // fulls in an array with matched letters with the word to find
            goodletterCloned.push(e.target.value.toUpperCase());
            document.querySelector('input').style.boxShadow='0px 0px 4px green'   
        } 
        else {                                                  // changes the background so to display each step of an hangman   
            document.querySelector('input').style.boxShadow='0px 0px 4px red';

            document.querySelector('#hangman').style.background= 'url('+ hangTab[1] + ') no-repeat';
            document.querySelector('#hangman').style.backgroundPosition= '-250px -55px'
            errorCountCloned.push(1);                               // increments falseLetter count 
            hangTabCloned = hangTab.slice(1);   // remove first hangman image so that 'this.state.hangTab[1]' returns a different one each time
            // hangTabCloned2.push(hangTab.slice(1,1));
            // console.log(hangTab[1]);
        }
         
            // console.log(hangTabCloned2.length)
            console.log('hangTab ' + hangTab.length);
            console.log('hangTabCloned ' + hangTabCloned.length);
            console.log('hangTabCloned2 ' + hangTabCloned2.length);



        this.setState({ curentLetter: curentLetterCloned,    // state's uploading
                        goodletter: goodletterCloned, 
                        alreadyTried: alreadyTriedCloned,
                        wordToFindState: wordToFind,
                        hangTab: hangTabCloned
                    });

    }
 

    resetInput = () => {      // resets the input's field 400ms after keyup     
 
        setTimeout(() => document.querySelector('input').value= '', 400)
        
    }


    displayLetters = () =>     // displaying the found letters or an underscore ( _ )
        
        [...this.state.words[0]].map((item, index) => {     

            if(this.state.goodletter.includes(item)){      
                return <span style={ spanStyle } key={ index }>{ item }</span>
            }
            else {
                return  <span  style={ spanStyle }  key={ index }>_</span>       
            }

        })



    winnerDance = () => {          // displaying winning message if the word is found

        const letterCount= [];

        [...this.state.words[0]].map((item) => {
            
            if (this.state.goodletter.includes(item)){
                letterCount.push(1);
            }
        })


        if([...this.state.words[0]].length === letterCount.length){     // proposes a new word to guess 
            

            return <>
                    <div className="d-flex m-5 p-5 border border-success rounded">
                        <div className="mx-auto">
                        <h1 className="mt-5 my-5  font-weight-bold">well done !</h1>
                        <p className="m-5">Your score : { this.state.alreadyTried.length } </p>
                        <button className="btn btn-outline-success" style={ btnStyle } onClick={ this.changeWord }> another one ? </button>
                        </div>
                    </div>
                   </> 
        }
    }    
    

    looserDance = () => {     // displaying loosing message if the hangman is completed
       
        const errorCountCloned = this.state.errorCount;

        if (errorCountCloned.length === 8){
        
            document.querySelector('#hangman').style.background= 'url('+ this.state.hangTab[0] + ') no-repeat';               
                return <>
                        <div className="d-flex mt-5 mx-auto p-3 border border-warning rounded col-8">
                            <div className="mx-auto">
                            <h1 className="mt-5 my-5  font-weight-bold">You loose !</h1>
                            <p className="m-5">Your score : { this.state.alreadyTried.length } </p>
                            <button className="btn btn-outline-warning mb-2" style={ btnStyle } onClick={ this.changeWord }> another one ? </button>
                            </div>
                        </div>
                       </>             
         
        } 
    }

     
    changeWord = () => {      // takes off the first word of the array of words to guess so that a new word is behind the expression 'this.state.words[0]]'        

        const words = this.state.words; 
        const newWords = words.slice(1);
        

        this.setState({
            words: newWords,
            goodletter: [],
            alreadyTried: [],
            errorCount: []
        })


    }


  
    render() { 
        return ( 
            <>
            <div className="mx-5 d-flex justify-content-around flex-wrap">
                { this.displayLetters() }
            </div>      
            <div>
                { this.winnerDance() }
                { this.looserDance() } 
            </div>
            <div className="row">
                <div style={ divStyle } className="col-6">
                    <div className="row">
                        <label style={ labelStyle } className="col-3 mt-5 pl-5 pt-1">Try a letter : </label>
                        <input type="text" autoFocus className="form-control col-1 mt-5" maxLength="1" onChange={ this.handleChange } name="letter" onKeyUp={ this.resetInput }/>
                    </div>
                    <div className="row m-5">
                    <Tries alreadyTried={ this.state.alreadyTried }/>     
                    </div>
                </div>
                <div style={ hangman } id="hangman" className="col-5"></div>
            </div>
            </>
        )
    }
}


 
export default User;

