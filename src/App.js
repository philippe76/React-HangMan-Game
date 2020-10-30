import React from 'react';
import bootstrap from 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import Player from './Player'


class App extends React.Component {
  
  render() { 
    return ( 
        <>
          <div className="jumbotron bg-dark">
            <h1 className="display-4 text-center text-danger font-weight-normal">The HangMan Game</h1>
          </div>
          <div>            
            <Player />
          </div>
        </>  
     );
  }
}
 
export default App;


