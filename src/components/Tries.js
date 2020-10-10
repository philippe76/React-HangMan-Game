import React from 'react';


// displaying previous tried letters

const Tries = (props) => props.alreadyTried.map((item, index) =>
    <span key={ index } className="mx-2">{ item.toUpperCase()} -</span>
    
)
  

export default Tries;
