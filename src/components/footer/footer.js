import React, { Component } from 'react';

import './footer.css';
import TaskFilter from '../task-filter';

export default class Footer extends Component {
  render() {
    return (
      <footer className='footer'>
        <span className='todo-count'>items left</span>
        <TaskFilter />
        <button className='clear-completed'>Clear completed</button>
      </footer>
    );
  }
}
