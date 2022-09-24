import React, { Component } from 'react';
import { formatDistance } from 'date-fns';
import './task.css';

export default class Task extends Component {
  getFormattedDate() {
    const dateNow = new Date();
    return formatDistance(this.props.created, dateNow, { addSuffix: true });
  }

  render() {
    const {
      onDeleted,
      description,
      created,
      onToggleImportant,
      onToggleDone,
      done,
      important,
    } = this.props;

    let classNames = 'toggle';
    if (done) {
      classNames += ' done';
    }
    return (
      <div className='view'>
        <input
          className={classNames}
          type='checkbox'
          readOnly
          onChange={onToggleDone}
          checked={done}
        />

        <div className='label'>
          <span role='presentation' className='title' onClick={onToggleDone}>
            {description}
          </span>
          <span className='description'>
            <span className='description__time-value'></span>
          </span>
          <span className='created'>Created {this.getFormattedDate()}</span>
        </div>
        <button type='button' className='icon icon-edit' aria-label='log out' />
        <button
          type='button'
          className='icon icon-destroy'
          aria-label='log out'
          onClick={onDeleted}
        />
      </div>
    );
  }
}
