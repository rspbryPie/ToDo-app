import React from 'react';
import PropTypes from 'prop-types';
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

TaskList.defaultProps = {
  tasksData: () => {},
  onDeleted: () => {},
  onToggleDone: () => {},
};

TaskList.propTypes = {
  tasksData: PropTypes.instanceOf(Array),
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
};

export default TaskList;
