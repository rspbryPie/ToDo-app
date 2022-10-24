import React from 'react'
import './task-filter.css'

const TaskFilter = ({ onFilterChange, filter }) => {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' },
  ]

  const filteredButtons = buttons.map(({ name, label }) => {
    const isActive = filter === name
    const clazz = isActive ? 'btn-info' : 'btn-outline-secondary'
    return (
      <button key={name} type="button" className={`btn ${clazz}`} onClick={() => onFilterChange(name)}>
        {label}
      </button>
    )
  })

  return <div className="filters">{filteredButtons}</div>
}

export default TaskFilter
