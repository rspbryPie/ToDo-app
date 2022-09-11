import React from 'react';

import Task from '../task';

import './task-list.css';

const TaskList = ({ tasksData }) => {
  const taskElements = tasksData.map((taskElement) => {
    const { id, ...taskElementProps } = taskElement;

    return (
      <li key={id} className='todo-list'>
        <Task {...taskElementProps} />
      </li>
    );
  });

  return <ul className='todo-list'>{taskElements}</ul>;
};

export default TaskList;
