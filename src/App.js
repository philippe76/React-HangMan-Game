import React from 'react';
import bootstrap from 'bootstrap/dist/css/bootstrap.css'
import User from './User'


class App extends React.Component {
  
  render() { 
    return ( 
        <>
          <div className="jumbotron bg-dark">
            <h1 className="display-4 text-center text-danger font-weight-normal">The HangMan Game</h1>
          </div>
          <div>            
            <User />
          </div>
        </>  
     );
  }
}
 
export default App;


