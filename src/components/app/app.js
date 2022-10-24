import { useState } from 'react'

import TaskList from '../task-list'
import Footer from '../footer'
import NewTaskForm from '../new-task-form'

import './app.css'

const App = () => {
  const [tasksData, setTasksData] = useState([])
  const [filter, setFilter] = useState('all')
  const [taskId, setTaskId] = useState(1)

  const createTodoItem = (label, minValue = 0, secValue = 0) => {
    const trimDescription = label.replace(/ +/g, ' ').trim()
    // todo добавить проверку на число

    let minValueNumber = +minValue
    let secValueNumber = +secValue
    if (secValueNumber > 60) {
      minValueNumber += Math.trunc(secValueNumber / 60)
      secValueNumber -= Math.trunc(secValueNumber / 60) * 60
    }
    return {
      description: trimDescription,
      created: new Date(),
      done: false,
      id: taskId,
      isChange: false,
      minValue: minValueNumber,
      secValue: secValueNumber,
    }
  }

  const editingItem = (id) => {
    const newtasksData = tasksData.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          isChange: true,
        }
      }
      return el
    })

    setTasksData(newtasksData)
  }

  const deleteItem = (id) => {
    const idx = tasksData.findIndex((el) => el.id === id)
    const newArray = [...tasksData.slice(0, idx), ...tasksData.slice(idx + 1)]
    setTasksData(newArray)
  }

  const addItem = (text, minValue = 12, secValue = 45) => {
    const newItem = createTodoItem(text, minValue, secValue)
    const newArray = [...tasksData, newItem]
    setTaskId(taskId + 1)
    setTasksData(newArray)
  }

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id)
    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  const onToggleImportant = (id) => {
    setTasksData(toggleProperty(tasksData, id, 'isChange'))
  }

  const onToggleDone = (id) => {
    setTasksData(toggleProperty(tasksData, id, 'done'))
  }

  const onDeleteDone = () => {
    const newArray = tasksData.filter((task) => !task.done)
    setTasksData(newArray)
  }

  const changeDescription = (id, neWdescription) => {
    const newTasksData = tasksData.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          description: neWdescription,
          isChange: false,
        }
      }
      return el
    })
    setTasksData(newTasksData)
  }

  const onFilterChange = (filterBtn) => {
    setFilter(filterBtn)
  }

  const showFilter = (items, filter) => {
    switch (filter) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => !item.done)
      case 'done':
        return items.filter((item) => item.done)
      default:
        return items
    }
  }

  let doneCount = tasksData.filter((el) => el.done).length
  let todoCount = tasksData.length - doneCount

  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAdded={addItem} />
        </header>
        <section className="main">
          <TaskList
            tasksData={showFilter(tasksData, filter)}
            onDeleted={deleteItem}
            onToggleImportant={onToggleImportant}
            onToggleDone={onToggleDone}
            onEditClick={editingItem}
            onChangeDescription={changeDescription}
          />
          <Footer
            tasksData={tasksData}
            todoCount={todoCount}
            onDeleteDone={onDeleteDone}
            onFilterChange={onFilterChange}
            filter={filter}
          />
        </section>
      </section>
    </div>
  )
}

export default App
