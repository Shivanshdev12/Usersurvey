import React from 'react';
import logo from './logo.svg';
import './App.css';
import Uservey from './Uservey';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Uservey/>
    </div>
  );
}

export default App;
