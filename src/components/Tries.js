import React from 'react';


// displaying previous tried letters

const Tries = (props) => {
    return (
        <div className="triedLetters">
        {/* <p>Tried Letters:</p> */}
            {props.alreadyTried.map((item, index) => {
                return  <span key={index} >    
                            {item.toUpperCase()} - 
                        </span>   
            })}            
        </div>  
    )
}
     
    
    

  

export default Tries;
