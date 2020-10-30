import React from 'react';
import Register from './pages/register/register'
//instalar esta librerianpm
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//en la ruta / estara el componente register y login.

function App() {
  return (
    <div className="App">
      <Router>
                <Switch>
                <Route exact path="/" component={Register} />
                </Switch>
                  <br></br>
                  <br></br>
                  <br></br>
                  
      </Router>
    </div>
  );
}

export default App;
