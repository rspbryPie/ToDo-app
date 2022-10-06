import React, { Component } from 'react'
import './task-filter.css'

export default class TaskFilter extends Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' },
  ]

  render() {
    const { onFilterChange, filter } = this.props

    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name
      const clazz = isActive ? 'btn-info' : 'btn-outline-secondary'
      return (
        <button key={name} type="button" className={`btn ${clazz}`} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      )
    })

    return <div className="filters">{buttons}</div>
  }
}
