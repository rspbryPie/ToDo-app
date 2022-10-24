import React from 'react'

import TaskFilter from '../task-filter'

import './footer.css'

const Footer = ({ todoCount, onDeleteDone, onFilterChange, filter }) => {
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

export default Footer
