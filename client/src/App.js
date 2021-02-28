import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Bulletin from "./components/Bulletin";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Bulletin />
      </div>
    );
  }
}

export default App;
