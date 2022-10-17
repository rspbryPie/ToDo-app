import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TaskList from '../task-list'
import Footer from '../footer'
import NewTaskForm from '../new-task-form'

import './app.css'

export default class App extends Component {
  maxId = 100

  state = {
    tasksData: [],
    filter: 'all',
  }

  static defaultProps = {
    tasksData: [
      {
        id: 10,
        description: 'Получить список задач',
        created: new Date(),
        done: false,
        isChange: false,
        minValue: 0,
        secValue: 0,
      },
    ],
    filter: 'all',
  }

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    filter: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    tasksData: PropTypes.instanceOf(Array),
  }

  // eslint-disable-next-line react/sort-comp
  createTodoItem(label, minValue = 0, secValue = 0) {
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
      // eslint-disable-next-line no-plusplus
      id: this.maxId++,
      isChange: false,
      minValue: minValueNumber,
      secValue: secValueNumber,
    }
  }

  editingItem = (id) => {
    this.setState(({ tasksData }) => {
      const newtasksData = tasksData.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            isChange: true,
          }
        }
        return el
      })
      return {
        tasksData: newtasksData,
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({ tasksData }) => {
      const idx = tasksData.findIndex((el) => el.id === id)

      const newArray = [...tasksData.slice(0, idx), ...tasksData.slice(idx + 1)]

      return {
        tasksData: newArray,
      }
    })
  }

  addItem = (text, minValue = 12, secValue = 45) => {
    const newItem = this.createTodoItem(text, minValue, secValue)
    this.setState(({ tasksData }) => {
      const newArray = [...tasksData, newItem]

      return {
        tasksData: newArray,
      }
    })
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id)
    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  onToggleImportant = (id) => {
    this.setState(({ tasksData }) => ({
      tasksData: this.toggleProperty(tasksData, id, 'isChange'),
    }))
  }

  onToggleDone = (id) => {
    this.setState(({ tasksData }) => ({
      tasksData: this.toggleProperty(tasksData, id, 'done'),
    }))
  }

  onDeleteDone = () => {
    this.setState(({ tasksData }) => {
      const newArray = tasksData.filter((task) => !task.done)
      return {
        tasksData: newArray,
      }
    })
  }

  changeDescription = (id, neWdescription) => {
    this.setState(({ tasksData }) => {
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
      return {
        tasksData: newTasksData,
      }
    })
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  filter = (items, filter) => {
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

  render() {
    const { tasksData, filter } = this.state

    const visibleItems = this.filter(tasksData, filter)

    const doneCount = tasksData.filter((el) => el.done).length

    const todoCount = tasksData.length - doneCount

    return (
      <div>
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <NewTaskForm onAdded={this.addItem} />
          </header>
          <section className="main">
            <TaskList
              tasksData={visibleItems}
              onDeleted={this.deleteItem}
              onToggleImportant={this.onToggleImportant}
              onToggleDone={this.onToggleDone}
              onEditClick={this.editingItem}
              onChangeDescription={this.changeDescription}
            />
            <Footer
              tasksData={this.state.tasksData}
              todoCount={todoCount}
              onDeleteDone={this.onDeleteDone}
              onFilterChange={this.onFilterChange}
              filter={filter}
            />
          </section>
        </section>
      </div>
    )
  }
}
