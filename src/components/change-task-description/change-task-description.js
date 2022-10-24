import { useState } from 'react'

import './change-task-description.css'

const ChangeTaskDescription = ({ onChangeDescription, id, description }) => {
  const [newDescription, setNewDescription] = useState('')

  const onDescriptionChange = (event) => {
    setNewDescription(event.target.value.replace(/ +/g, ' '))
  }

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (newDescription === '') {
        onChangeDescription(id, description)
      } else {
        onChangeDescription(id, newDescription)
      }
    }
  }

  return (
    <input
      autoComplete="off"
      key={id}
      type="text"
      className="edit"
      value={newDescription}
      placeholder={description}
      onChange={onDescriptionChange}
      onKeyPress={onKeyPress}
    />
  )
}
export default ChangeTaskDescription
