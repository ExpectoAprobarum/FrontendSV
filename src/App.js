import React, {Component} from 'react';
//import { Provider } from 'react-redux';
import PageCreateGame from'./components/PageCreateGame';
import {BrowserRouter as Router, Route, Link, useHistory} from 'react-router-dom';


class App extends Component { 
  render(){
      return(
          <div className='App'>
              <Router>
                  <Link to ='/'>Home</Link>
                  <br></br>
                  <br></br>
                  <br></br>
                  <Route exact path="/" render= { () => {
                      return <div>
                          < PageCreateGame/>
                      </div>
                  }} />
                  <Route path='/Lobby' render={() => {
                    return <h1>Lobby</h1>
                  }}/>
              </Router>
          </div>
      );
  }
}

export default App;