import React, { Component } from 'react'
import { connect } from 'react-redux'
import { add } from './../reducers/todo'


class AddItem extends Component {

  constructor(props) {
    super(props)

    this.state = { value: '' }
  }

  onChange = ({ target }) => this.setState({ value: target.value })

  onKeyPress = ({ key }) => key === 'Enter' && this.props.add(this.state.value) && this.setState({ value: '' })

  render() {
    return (
      <input type="text"
        onChange={this.onChange}
        onKeyPress={this.onKeyPress}
        value={this.state.value}
        placeholder="Add todo"
      />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  add: add(dispatch)
});

export default connect(undefined, mapDispatchToProps)(AddItem);

