import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  state = {
    label: '',
  };

  static defaultProps = {
    onAdded: () => {},
  };

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    onAdded: PropTypes.func,
  };
  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAdded(this.state.label);
    this.setState({
      label: '',
    });
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type='text'
          className='new-todo'
          placeholder='What needs to be done?'
          onChange={this.onLabelChange}
          value={this.state.label}
        />
      </form>
    );
  }
}
