import React, { Component } from 'react';
import './App.scss';
import AddTask from './components/addTask'
import Tasks from './components/tasks';

class App extends Component {
  state = {
    tasks: [
      {
        id: '1',
        name: 'Completed Task',
        status: 'COMPLETE',
      },
      {
        id: '2',
        name: 'Incomplete Task',
        status: 'INCOMPLETE',
      },
    ],
    lastIndex: 2,
    view: 'ALL'
  };

  onToggleComplete = (toggleTask) => {
    const tasks = this.state.tasks.map(task => {
      if (task.id === toggleTask.id) {
        let status;
        if (task.status === 'COMPLETE') {
          status = 'INCOMPLETE';
        }
        else {
          status = 'COMPLETE';
        }
        return { ...task, status };
      }
      return task;
    })
    this.setState({ tasks });
  };

  onInputHandler = (todo) => {
    if (todo === '') {
      alert('Empty Task');
      return;
    }
    const lastIndex = this.state.lastIndex + 1;
    const tasks = [...this.state.tasks, {
      id: "" + lastIndex,
      name: todo,
      status: 'INCOMPLETE',
    }];
    this.setState({ tasks, lastIndex });
  }

  deleteTodo = (todoId, ev) => {
    const tasks = this.state.tasks.filter(task => task.id !== todoId);
    this.setState({ tasks });
    ev.stopPropagation();
  };

  defaultView = (ev) => {
    const view = 'ALL';
    this.setState({ view });
  }

  completedTasksView = (ev) => {
    const view = 'COMPLETE';
    this.setState({ view });
  }

  incompleteTasksView = (ev) => {
    const view = 'INCOMPLETE';
    this.setState({ view });
  }

  render() {
    return (
      <div className='body'>
        <AddTask onAdd={this.onInputHandler} />
        <Tasks toggleTask={this.onToggleComplete} onDelete={this.deleteTodo} tasks={this.state.tasks} view={this.state.view} />
        <div className="filters">
          <button className={this.state.view === 'ALL' ? 'filter active' : 'filter'} onClick={this.defaultView}>All Tasks</button>
          <button className={this.state.view === 'INCOMPLETE' ? 'filter active' : 'filter'} onClick={this.incompleteTasksView}>Incomplete Tasks</button>
          <button className={this.state.view === 'COMPLETE' ? 'filter active' : 'filter'} onClick={this.completedTasksView}>Completed Tasks</button>
        </div>
      </div >
    );
  }
}

export default App;