import React, { useState } from "react";
import words from "../words";

// displaying the found letters or an underscore ( _ )
// const Letters = () => {

//   [...this.state.words[0]].map((item, index) => {

//     if (this.state.goodletter.includes(item)) {
//       return (
//         <span style={spanStyle} key={index}>
//           {item}
//         </span>
//       );
//     } else {
//       return (
//         <span style={spanStyle} key={index}>
//           _
//         </span>
//       );
//     }
//   });
// };
const spanStyle = {
  border: "1px solid grey",
  fontSize: "2rem",
  fontWeight: "bolder",
  margin: "1rem",
  padding: "1rem",
};

const Letters = () => {
  const [goodLetters, setgoodLetters] = useState([]);
  [...words[0]].map((item, index) => {
    return goodLetters.includes(item) ? (
      <span style={spanStyle} key={index}>
        {item}
      </span>
    ) : (
      <span style={spanStyle} key={index}>
        _
      </span>
    );
  });
};

export default Letters;
