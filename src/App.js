import React, {Component} from 'react';
import PageCreateGame from'./components/PageCreateGame';
//instalar esta libreria
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


class App extends Component { 

    render(){
      return(
          <div className='App'>
              <Router>
                  <Link to ='/'>Home</Link>
                  <br></br>
                  <br></br>
                  <br></br>
                  <Route exact path="/" component={PageCreateGame} />
                  <Route path='/Lobby' render={() => {
                    return <h1>Lobby</h1>
                  }}/>
              </Router>
          </div>
      );
  }
}

export default App;