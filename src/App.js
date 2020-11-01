import React from 'react';
import PageCreateGame from'./pages/creategame/PageCreateGame';
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
                <Route exact path="/home" component={PageCreateGame}></Route>
                <Route path="/Game" component={LobbyPage}></Route>
                <Route exact path="/" component={Register}>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;