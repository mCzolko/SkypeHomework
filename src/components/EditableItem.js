import React, { Component } from 'react'
import { connect } from 'react-redux'
import { edit } from './../reducers/todo'


class EditableItem extends Component {

  constructor(props) {
    super(props)

    this.state = { value: props.value }
  }

  assignReference = element => element && element.focus()

  save = () => this.props.edit(this.props.id, this.state.value) && this.props.onBlur()

  onChange = ({ target }) => this.setState({ value: target.value })

  onBlur = () => this.save()

  onKeyPress = ({ key }) => key === 'Enter' && this.save()

  render() {
    return(
      <li>
        <input
          type="text"
          className="Item Item--editable"
          value={this.state.value}
          ref={this.assignReference}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
        />
      </li>
    )
  }

}

const mapDispatchToProps = dispatch => ({
  edit: edit(dispatch)
});

export default connect(undefined, mapDispatchToProps)(EditableItem);
