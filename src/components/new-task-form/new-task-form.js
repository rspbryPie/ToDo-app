import { useState } from 'react'

import './new-task-form.css'

const NewTaskForm = ({ onAdded }) => {
  const [label, setLabel] = useState('')
  const [minValue, setMinValue] = useState('')
  const [secValue, setSecValue] = useState('')

  const onLabelChange = (e) => {
    if (e.target.name === 'label') {
      setLabel(e.target.value)
    } else if (e.target.name === 'minValue') {
      setMinValue(e.target.value)
    } else if (e.target.name === 'secValue') {
      setSecValue(e.target.value)
    }
  }

  const onSubmit = () => {
    if (!label) return
    onAdded(label, minValue, secValue)
    setLabel('')
    setMinValue('')
    setSecValue('')
  }

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        autoComplete="off"
        onKeyPress={(e) => {
          if (e.key === 'Enter') onSubmit()
        }}
        type="text"
        name="label"
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={onLabelChange}
        value={label}
      />
      <input
        onKeyPress={(e) => {
          if (e.key === 'Enter' && label !== '') onSubmit()
        }}
        min="0"
        max="60"
        autoComplete="off"
        type="number"
        className="new-todo-form__timer"
        name="minValue"
        placeholder="Min"
        onChange={onLabelChange}
        value={minValue}
      />
      <input
        onKeyPress={(e) => {
          if (e.key === 'Enter' && label !== '') onSubmit()
        }}
        autoComplete="off"
        min="0"
        max="60"
        type="number"
        className="new-todo-form__timer"
        name="secValue"
        placeholder="Sec"
        onChange={onLabelChange}
        value={secValue}
      />
    </form>
  )
}

export default NewTaskForm
