import React, { Component } from 'react'
import { formatDistance } from 'date-fns'
import PropTypes from 'prop-types'

import './task.css'

export default class Task extends Component {
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

  getFormattedDate() {
    const dateNow = new Date()
    return formatDistance(this.props.created, dateNow, { addSuffix: true })
  }

  render() {
    const { onDeleted, description, onToggleDone, done, onToggleImportant, isChange } = this.props

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
            <span className="description__time-value" />
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
            <span className="description__time-value" />
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
