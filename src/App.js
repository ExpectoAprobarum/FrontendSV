import React from 'react';
import Register from './pages/register/register'
import LobbyPage from './components/Lobby'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import PrincipalPage from './principalpage/principalpage';

function App() { 
  return (
        <Router>
            <Switch>
                <Route exact path="/home" component={PrincipalPage}></Route>
                <Route path="/Game" component={LobbyPage}></Route>
                <Route exact path="/" component={Register}>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;