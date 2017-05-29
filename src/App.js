import React, { Component } from 'react';
import TodoList from './components/List';
import AddItem from './components/AddItem';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="content">

          <h1>ToDo List</h1>

          <AddItem />

          <TodoList />

        </div>
      </div>
    );
  }
}

export default App;
