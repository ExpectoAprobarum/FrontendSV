import React from 'react';
import LobbyPage from './pages/lobby/Lobby'
import Register from './pages/register/register'
import Login from './pages/login/login'
import Invite from './pages/invite/inviteURL'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChangeProfile from './pages/changeProfile/changeProfile';
import PrincipalPage from './principalpages/createAndjoinAndChang';
import RegisterAndLogin from './principalpages/registerAndlogin'
import Verification from './pages/verification/verification'
import './App.css'

function App() {
  return (
    <div className='Principalpagestyle'>
      <Router>
        <Switch>
          <Route exact path="/home" component={PrincipalPage}></Route>
          <Route exact path="/game" component={LobbyPage}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/" component={RegisterAndLogin}></Route>
          <Route path="/game/invite" component={Invite}></Route>
          <Route exact path='/changeprofile' component={ChangeProfile}></Route>
          <Route exact path='/verification' component={Verification}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
