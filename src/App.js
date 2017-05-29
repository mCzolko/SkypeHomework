import React, { Component } from 'react';
import TodoList from './components/List';
import AddItem from './components/AddItem';
import logo from './logo.svg';
import { connect } from 'react-redux';
import { load } from './reducers/todo';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      error: false
    }
  }

  load() {
    this.props.load()
      .then(() => this.setState({ loading: false, error: false }))
      .catch(() => this.setState({ loading: false, error: true }))
  }

  componentDidMount() {
    this.load()
  }

  onLoadClick = () => this.setState({ error: false, loading: true }, this.load())

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="content">

          <h1>ToDo List</h1>

          { this.state.loading && !this.state.error &&
            <span>Loading...</span>
          }

          { !this.state.loading && !this.state.error &&
            <div>
              <AddItem />

              <TodoList />
            </div>
          }

          { this.state.error &&
            <div>Loading error happened, try <button onClick={this.onLoadClick}>load again</button></div>
          }

        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  load: () => load(dispatch)
})

export default connect(undefined, mapDispatchToProps)(App);
