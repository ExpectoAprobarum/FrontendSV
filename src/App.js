import React from 'react';
import LobbyPage from './pages/lobby/Lobby'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import PrincipalPage from './principalpages/createAndjoin';
import RegisterAndLogin from './principalpages/registerAndlogin'
import EmitProclamation from './pages/game/components/EmitProclamation';

function App() { 
  return (
        <Router>
            <Switch>
                <Route exact path="/home" component={EmitProclamation}></Route>
                <Route path="/Game" component={LobbyPage}></Route>
                <Route exact path="/" component={RegisterAndLogin}>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;