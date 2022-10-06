import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TaskFilter from '../task-filter'

import './footer.css'

// eslint-disable-next-line react/prefer-stateless-function
export default class Footer extends Component {
  static defaultProps = {
    todoCount: 0,
    onDeleteDone: () => {},
    onFilterChange: () => {},
    filter: 'all',
  }

  static propTypes = {
    filter: PropTypes.string,
    todoCount: PropTypes.number,
    onDeleteDone: PropTypes.func,
    onFilterChange: PropTypes.func,
  }

  render() {
    const { todoCount, onDeleteDone, onFilterChange, filter } = this.props

    return (
      <footer className="footer">
        <span className="todo-count">items left {todoCount}</span>
        <TaskFilter onFilterChange={onFilterChange} filter={filter} />
        <button className="clear-completed" onClick={onDeleteDone}>
          Clear completed
        </button>
      </footer>
    )
  }
}
