import React from 'react'
import Item from './Item'
import { connect } from 'react-redux'

const List = props =>
  <ul>
    {Object.keys(props.todos).map(key =>
      <Item key={key} id={key}>{props.todos[key]}</Item>
    )}
  </ul>

const mapStateToProps = state => ({
 todos: state.todo
})

export default connect(mapStateToProps)(List)
