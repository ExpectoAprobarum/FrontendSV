import React from 'react';
import PageCreateGame from'./pages/creategame/PageCreateGame';
import Register from './pages/register/register'
import PersonList from './pages/joinagame/Lists'
//import LobbyPage from './components/Lobby'

import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
//<Route path="/Lobby"><LobbyPage /></Route>
function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/Home" component={PageCreateGame} ></Route>
                <Route exact path="/" component={Register}></Route>
            </Switch>
        </Router>
    );
}

export default App;