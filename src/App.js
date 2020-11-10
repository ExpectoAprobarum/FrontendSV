import React from 'react';
import LobbyPage from './pages/lobby/Lobby'
import Register from './pages/register/register'
import Login from './pages/login/login'
import Invite from './pages/invite/inviteURL'
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
                <Route exact path="/Game" component={LobbyPage}></Route>
                <Route exact path="/register" component={Register}></Route>
                <Route exact path="/login" component={Login}></Route>
                <Route exact path="/" component={RegisterAndLogin}></Route>
                <Route path="/Game/invite" component={Invite}></Route>
            </Switch>
        </Router>
    );
}

export default App;
