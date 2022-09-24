import React, { Component } from 'react';

import './footer.css';
import TaskFilter from '../task-filter';

export default class Footer extends Component {
  render() {
    const { todoCount, onDeleteDone, onFilterChange, filter } = this.props;

    return (
      <footer className='footer'>
        <span className='todo-count'>items left {todoCount}</span>
        <TaskFilter onFilterChange={onFilterChange} filter={filter} />
        <button className='clear-completed' onClick={onDeleteDone}>
          Clear completed
        </button>
      </footer>
    );
  }
}
