import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

export default class NewTaskForm extends Component {
  static defaultProps = {
    placeHolderText: 'What needs to be done?',
    onLabelChange: () => {},
    onSubmit: () => {},
  }

  static propTypes = {
    placeHolderText: PropTypes.string,
    onLabelChange: PropTypes.func,
    onSubmit: PropTypes.func,
  }

  state = {
    label: '',
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.addItem(this.state.label)
    this.setState({
      label: '',
    })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder={this.props.placeHolderText}
          autoFocus
          onChange={this.onLabelChange}
          value={this.state.label}
        ></input>
      </form>
    )
  }
}
