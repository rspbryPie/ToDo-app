import React, { Component } from 'react';

import TaskList from '../task-list';
import Footer from '../footer';
import NewTaskForm from '../new-task-form';

import './app.css';

export default class App extends Component {
  state = {
    tasksData: [
      {
        classStatus: 'completed',
        description: 'Completed task',
        created: 'created 17 seconds ago',
        id: 1,
      },
      {
        classStatus: 'editing',
        description: 'Editing task',
        created: 'created 5 minutes ago',
        id: 2,
      },
      {
        description: 'Active task',
        created: 'created 5 minutes ago',
        id: 3,
      },
    ],
  };

  render() {
    return (
      <div>
        <section className='todoapp'>
          <header className='header'>
            <h1>todos</h1>
            <NewTaskForm />
          </header>
          <section className='main'>
            <TaskList tasksData={this.state.tasksData} />
            <Footer />
          </section>
        </section>
      </div>
    );
  }
}
