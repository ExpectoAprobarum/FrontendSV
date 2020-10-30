import React, {Component} from 'react';
import PageCreateGame from'./pages/PageCreateGame';
//instalar esta libreria
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


class App extends Component { 

    render(){
      return(
          <div className='App'>
              <Router>
                <Switch>
                <Route exact path="/home" component={PageCreateGame} />
                <Route path='/Lobby' render={() => {return <h1>Lobby</h1>}}/>
                </Switch>
                  <br></br>
                  <br></br>
                  <br></br>
                  
              </Router>
          </div>
      );
  }
}

export default App;