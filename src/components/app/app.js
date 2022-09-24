import React, { Component } from 'react';

import TaskList from '../task-list';
import Footer from '../footer';
import NewTaskForm from '../new-task-form';

import './app.css';

export default class App extends Component {
  maxId = 100;

  state = {
    tasksData: [
      this.createTodoItem('Completed task'),
      this.createTodoItem('Editing task'),
      this.createTodoItem('Active task'),
    ],
    filter: 'active',
  };

  createTodoItem(label) {
    return {
      description: label,
      created: new Date(),
      done: false,
      id: this.maxId++,
    };
  }

  deleteItem = (id) => {
    this.setState(({ tasksData }) => {
      const idx = tasksData.findIndex((el) => el.id === id);

      const newArray = [
        ...tasksData.slice(0, idx),
        ...tasksData.slice(idx + 1),
      ];

      return {
        tasksData: newArray,
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({ tasksData }) => {
      const newArray = [...tasksData, newItem];

      return {
        tasksData: newArray,
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleImportant = (id) => {
    this.setState(({ tasksData }) => {
      return {
        tasksData: this.toggleProperty(tasksData, id, 'important'),
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ tasksData }) => {
      return {
        tasksData: this.toggleProperty(tasksData, id, 'done'),
      };
    });
  };

  onDeleteDone = () => {
    this.setState(({ tasksData }) => {
      const newArray = tasksData.filter((task) => !task.done);
      return {
        tasksData: newArray,
      };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  filter = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  };

  render() {
    const { tasksData, filter } = this.state;

    const visibleItems = this.filter(tasksData, filter);

    const doneCount = tasksData.filter((el) => el.done).length;

    const todoCount = tasksData.length - doneCount;

    return (
      <div>
        <section className='todoapp'>
          <header className='header'>
            <h1>todos</h1>
            <NewTaskForm onAdded={this.addItem} />
          </header>
          <section className='main'>
            <TaskList
              tasksData={visibleItems}
              onDeleted={this.deleteItem}
              onToggleImportant={this.onToggleImportant}
              onToggleDone={this.onToggleDone}
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
    );
  }
}
