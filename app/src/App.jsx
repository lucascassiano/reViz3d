import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import box from './box.svg';
import reactLogo from './logo.svg';
import pipeline from "./assets/pipeline.svg";

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }

    setInterval(this.counter.bind(this), 1000);

  }
  counter() {
    var counter = this.state.counter;
    counter++;
    this.setState({ counter: counter });
  }
  render() {
    return (
      <div className="App">
        <img className="App-logo" src={reactLogo} />
        <br />
        <img className="App-logo-box" src={box} />
        <header className="App-header">
          <h1 className="App-title">Welcome to React + Parcel</h1>
          <h2>counter: {this.state.counter}</h2>
        </header>

        <p className="App-intro">
          This is how this app is up and running:
        </p>
        <img src={pipeline} />
      </div>
    );
  }
}
export default App;
