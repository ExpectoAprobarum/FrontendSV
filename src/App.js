import React from 'react';
import Register from './pages/register/register'
import LobbyPage from './pages/lobby/Lobby'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import PrincipalPage from './principalpages/createAndjoin';
import RegisterAndLogin from './principalpages/registerAndlogin'

function App() { 
  return (
        <Router>
            <Switch>
                <Route exact path="/home" component={PrincipalPage}></Route>
                <Route path="/Game" component={LobbyPage}></Route>
                <Route exact path="/" component={RegisterAndLogin}>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;