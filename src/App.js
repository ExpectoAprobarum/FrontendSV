import React from 'react';
import PageCreateGame from'./pages/PageCreateGame';
import Register from './pages/register/register'
import PersonList from './components/Lists'
import LobbyPage from './components/Lobby'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/home" component={PageCreateGame} />
                <Route path="/Join">
                    <PersonList />
                </Route>
                <Route path="/Lobby">
                    <LobbyPage />
                </Route>
                <Route exact path="/" component={Register}>
                    <h1>Inicio</h1>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;