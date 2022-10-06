import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './change-task-description.css'

export default class ChangeTaskDescription extends Component {
  state = {
    newDescription: '',
  }

  static defaultProps = {
    description: '',
    onChangeDescription: () => {},
  }

  static propTypes = {
    description: PropTypes.string,
    // eslint-disable-next-line react/require-default-props
    id: PropTypes.number,
    onChangeDescription: PropTypes.func,
  }

  onDescriptionChange = (event) => {
    this.setState({
      newDescription: event.target.value.replace(/ +/g, ' '),
    })
  }

  onKeyPress = (event) => {
    const { onChangeDescription, id, description } = this.props
    const { newDescription } = this.state
    if (event.key === 'Enter') {
      if (newDescription === '') {
        onChangeDescription(id, description)
      } else {
        onChangeDescription(id, newDescription)
      }
    }
  }

  render() {
    const { newDescription } = this.state
    const { description, id } = this.props
    return (
      <input
        autoComplete="off"
        key={id}
        type="text"
        className="edit"
        value={newDescription}
        placeholder={description}
        onChange={this.onDescriptionChange}
        onKeyPress={this.onKeyPress}
      />
    )
  }
}
