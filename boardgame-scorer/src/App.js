import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './TotalScore.css';
import InstagramScraper from './igjs'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <script src='src/wordcounter.js'></script>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p></p>
        <InstagramScraper></InstagramScraper>
      </div>
    );
  }
}

export default App;
