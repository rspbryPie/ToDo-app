import React, { useState, useEffect } from 'react'
import { formatDistance } from 'date-fns'

import './task.css'

const Task = ({
  onDeleted,
  description,
  onToggleDone,
  done,
  onToggleImportant,
  isChange,
  minValue,
  secValue,
  created,
}) => {
  const [min, setMin] = useState(minValue)
  const [sec, setSec] = useState(secValue)
  const [isCounting, setCounting] = useState(false)

  useEffect(() => {
    let counterID = null
    if (isCounting) {
      counterID = setInterval(() => {
        secDecrement()
      }, 1000)
    } else {
      clearInterval(counterID)
    }

    return () => clearInterval(counterID)
  }, [isCounting])

  const handleStart = (event) => {
    event.stopPropagation()
    setCounting(true)
  }

  const handlePause = (event) => {
    event.stopPropagation()
    setCounting(false)
  }

  const getFormattedDate = () => {
    const dateNow = new Date()
    return formatDistance(created, dateNow, { addSuffix: true })
  }

  const minDecrement = () => {
    setMin(min - 1)
    setSec(59)
  }

  const secDecrement = () => {
    if (min === 0 && sec === 0 && isCounting === true) {
      setCounting(false)
      onToggleDone()
    }
    if (sec > 0) {
      setSec(sec - 1)
      setCounting(true)
    } else if (min >= 1) {
      minDecrement()
    }
  }

  const buttonTimer = !isCounting ? (
    <button type="button" className="icon icon-play" onClick={handleStart} />
  ) : (
    <button type="button" className="icon icon-pause" onClick={handlePause} />
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
        <span className="created">Created {getFormattedDate()}</span>
      </div>
      <button type="button" className="icon icon-edit" aria-label="log out" onClick={onToggleImportant} />
      <button type="button" className="icon icon-destroy" aria-label="log out" onClick={onDeleted} />
    </div>
  )

  const editTask = (
    <div className="view">
      <input className={classNames} type="checkbox" readOnly onChange={onToggleDone} checked={done} />
      <div className="label">
        <span className="description">
          {buttonTimer}
          <span className="description__time-value">
            {min}:{sec}
          </span>
        </span>
        <span className="created">Created {getFormattedDate()}</span>
      </div>
      <button type="button" className="icon icon-edit" aria-label="log out" onClick={onToggleImportant} />
      <button type="button" className="icon icon-destroy" aria-label="log out" onClick={onDeleted} />
    </div>
  )

  return isChange ? editTask : notEditTask
}

export default Task
