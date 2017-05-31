import React, { Component } from 'react'
import EditableItem from './EditableItem'
import { connect } from 'react-redux'
import { remove } from './../reducers/todo'
import './Item.css'


class Item extends Component {

  constructor(props) {
    super(props)

    this.state = { editing: false }
  }

  onEditClick = () => this.setState({ editing: true })

  onRemoveClick = () => this.props.remove(this.props.id)

  onChildBlur = () => this.setState({ editing: false })

  render() {
    return this.state.editing ?
      <EditableItem id={this.props.id} value={this.props.children} onBlur={this.onChildBlur} />
      :
      <li className="Item">
        <span className="Item__description" onClick={this.onEditClick}>{this.props.children}</span>
        <button onClick={this.onEditClick}>Edit</button>
        <button onClick={this.onRemoveClick}>Remove</button>
      </li>
  }

}

const mapDispatchToProps = dispatch => ({
  remove: remove(dispatch)
});

export default connect(undefined, mapDispatchToProps)(Item);

