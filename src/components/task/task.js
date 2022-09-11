import React from 'react';

import './task.css';

const Task = ({ classStatus, description, created, id }) => {
  //const inputField = (classStatus = 'editing' ? ( <input type='text' className='edit' value='Editing task' /> ) : null);

  return (
    <div className='view'>
      <input className='toggle' type='checkbox' readOnly />

      <div className='label'>
        <span role='presentation' className='title'>
          {description}
        </span>
        <span className='description'>
          <span className='description__time-value'></span>
        </span>
        <span className='created'>created ago</span>
      </div>
      <button type='button' className='icon icon-edit' aria-label='log out' />
      <button
        type='button'
        className='icon icon-destroy'
        aria-label='log out'
      />
    </div>
  );
};

export default Task;
