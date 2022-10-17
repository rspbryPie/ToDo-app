import React, { Component } from 'react'
import { formatDistance } from 'date-fns'
import PropTypes from 'prop-types'

import './task.css'

export default class Task extends Component {
  state = {
    // eslint-disable-next-line react/prop-types,react/destructuring-assignment
    min: this.props.minValue,
    // eslint-disable-next-line react/destructuring-assignment,react/prop-types
    sec: this.props.secValue,
    // eslint-disable-next-line react/no-unused-state
    isCounting: false,
  }

  static defaultProps = {
    description: 'Имя не задано',
    done: false,
    onDeleted: () => {},
    onToggleDone: () => {},
  }

  static propTypes = {
    description: PropTypes.string,
    done: PropTypes.bool,
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
  }

  componentWillUnmount() {
    clearInterval(this.counterID)
  }

  getFormattedDate() {
    const dateNow = new Date()
    return formatDistance(this.props.created, dateNow, { addSuffix: true })
  }

  minDecrement = () => {
    const { min } = this.state
    this.setState({
      min: min - 1,
      sec: 59,
    })
  }

  secDecrement = () => {
    const { min, sec, isCounting } = this.state
    const { onToggleDone } = this.props

    if (min === 0 && sec === 0 && isCounting === true) {
      onToggleDone()
      clearInterval(this.counterID)
      this.setState({
        isCounting: false,
      })
    }
    if (sec > 0) {
      this.setState({
        sec: sec - 1,
        isCounting: true,
      })
    } else {
      this.minDecrement()
    }
  }

  handlePause = (event) => {
    event.stopPropagation()
    this.setState({ isCounting: false })
    clearInterval(this.counterID)
  }

  handleStart = (event) => {
    event.stopPropagation()
    this.setState({ isCounting: true })
    this.counterID = setInterval(() => {
      this.secDecrement()
    }, 1000)
  }

  render() {
    const { onDeleted, description, onToggleDone, done, onToggleImportant, isChange } = this.props
    const { min, sec, isCounting } = this.state
    const buttonTimer = !isCounting ? (
      /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
      <button type="button" className="icon icon-play" onClick={this.handleStart} />
    ) : (
      /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
      <button type="button" className="icon icon-pause" onClick={this.handlePause} />
    )
    let classNames = 'toggle'
    if (done) {
      classNames += ' done'
    }

    const notEditTask = (
      <div className="view">
        <input className={classNames} type="checkbox" readOnly onChange={onToggleDone} checked={done} />

        <div className="label">
          <span role="presentation" className="title" onClick={onToggleDone}>
            {description}
          </span>

          <span className="description">
            {buttonTimer}
            <span className="description__time-value">
              {min}:{sec}
            </span>
          </span>
          <span className="created">Created {this.getFormattedDate()}</span>
        </div>
        <button type="button" className="icon icon-edit" aria-label="log out" onClick={onToggleImportant} />
        <button type="button" className="icon icon-destroy" aria-label="log out" onClick={onDeleted} />
      </div>
    )

    const editTask = (
      <div className="view">
        <input className={classNames} type="checkbox" readOnly onChange={onToggleDone} checked={done} />
        <div className="label">
          {/* <ChangeTaskDescription
            id={id}
            description={description}
            onChangeDescription={onChangeDescription}
          /> */}
          <span className="description">
            {buttonTimer}
            <span className="description__time-value">
              {min}:{sec}
            </span>
          </span>
          <span className="created">Created {this.getFormattedDate()}</span>
        </div>
        <button type="button" className="icon icon-edit" aria-label="log out" onClick={onToggleImportant} />
        <button type="button" className="icon icon-destroy" aria-label="log out" onClick={onDeleted} />
      </div>
    )

    return isChange ? editTask : notEditTask
  }
}
