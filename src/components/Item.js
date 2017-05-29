import React, { Component } from 'react'
import EditableItem from './EditableItem'
import { connect } from 'react-redux'
import { remove } from './../reducers/todo'


class Item extends Component {

  constructor(props) {
    super(props)

    this.state = { editing: false }
  }

  onClick = () => this.setState({ editing: true })

  onRemoveClick = () => this.props.remove(this.props.id)

  onChildBlur = () => this.setState({ editing: false })

  render() {
    return this.state.editing ?
      <EditableItem id={this.props.id} value={this.props.children} onBlur={this.onChildBlur} />
      :
      <li>
        <span onClick={this.onClick}>{this.props.children}</span>
        <span onClick={this.onRemoveClick}>Remove</span>
      </li>
  }

}

const mapDispatchToProps = dispatch => ({
  remove: remove(dispatch)
});

export default connect(undefined, mapDispatchToProps)(Item);

