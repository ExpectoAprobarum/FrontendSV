import React from 'react';
import PersonList from './components/Lists'

const divStyle = {
    color: '#182d5b',
    paddingLeft: '100px',
};

function App() {
  return (
    <div className="App">
        <h1 style={divStyle}>Unirse a Partida</h1>
        <label>
            <PersonList />
        </label>
        <div id="lista"></div>
    </div>
  );
}

export default App;
