import React from 'react';

import Task from '../task';

import './task-list.css';

const TaskList = ({
  tasksData,
  onDeleted,
  onToggleImportant,
  onToggleDone,
}) => {
  const taskElements = tasksData.map((taskElement) => {
    const { id, ...taskElementProps } = taskElement;

    return (
      <li key={id} className='todo-list'>
        <Task
          {...taskElementProps}
          onDeleted={() => onDeleted(id)}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)}
        />
      </li>
    );
  });

  return <ul className='todo-list'>{taskElements}</ul>;
};

export default TaskList;
