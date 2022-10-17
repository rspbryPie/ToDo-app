import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
    minValue: '',
    secValue: '',
  }

  static defaultProps = {
    onAdded: () => {},
  }

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    onAdded: PropTypes.func,
  }

  onLabelChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  onSubmit = () => {
    const { label, minValue, secValue } = this.state
    if (!this.state.label) return
    this.props.onAdded(label, minValue, secValue)
    this.setState({
      label: '',
      minValue: '',
      secValue: '',
    })
  }

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          onKeyPress={(e) => {
            if (e.key === 'Enter') this.onSubmit()
          }}
          type="text"
          name="label"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={this.state.label}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          name="minValue"
          placeholder="Min"
          onChange={this.onLabelChange}
          value={this.state.minValue}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          name="secValue"
          placeholder="Sec"
          onChange={this.onLabelChange}
          value={this.state.secValue}
        />
      </form>
    )
  }
}
