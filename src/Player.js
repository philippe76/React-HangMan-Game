import React, { useState } from 'react';



const User = () => {


    const [wordToFind, setWordToFind] = useState(['ANIMAL','LOUP', 'AISHA','ECOLE','ALPHABETIQUE', 'MAGNESIUM', 'STUPEFACTION', 'CONTINENT', 'MAYONNAISE', 'LANOUGADERE', 'JAVASCRIPT', 'BOOTSTRAP', 'INTELLIGENCE'])


    const handleChange = e => {
      
        console.log( wordToFind[0].includes(e.target.value.toUpperCase()) );

    }

    return ( 
        <>
        <div className="mx-5 d-flex justify-content-around flex-wrap">
            {/* { this.displayLetters() } */}
        </div>      
        <div>
            {/* { this.winnerDance() }
            { this.looserDance() }  */}
        </div>
        <div className="row">
            <div className="col-6 player">
                <div className="row">
                    <label className="col-3 mt-5 pl-5 pt-1">Try a letter : </label>
                    {/* <input type="text" autoFocus className="form-control col-1 mt-5" maxLength="1" onChange={ this.handleChange } name="letter" onKeyUp={ this.resetInput }/> */}
                    <input type="text" autoFocus className="form-control col-1 mt-5" maxLength="1" name="letter" onChange={ handleChange } />
                </div>
                <div className="row m-5">
                {/* <Tries alreadyTried={ this.state.alreadyTried }/>      */}
                </div>
            </div>
            {/* <div style={ hangman } id="hangman" className="col-5"></div> */}
        </div>
        </>
    )
}


export default User