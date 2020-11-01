import React from 'react';
import PageCreateGame from'./pages/PageCreateGame';
import Register from './pages/register/register'
import PersonList from './components/Lists'
import LobbyPage from './components/Lobby'
import Game from './components/Game'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

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