import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AddTask from './components/addTask'
import Tasks from './components/tasks';

class App extends Component {
  state = {
    tasks: [
      {
        id: '1',
        name: 'Completed Task',
        status: 1,
      },
      {
        id: '2',
        name: 'Incomplete Task',
        status: 0,
      },
    ],
    lastIndex: 2,
    displayTasks: [
      {
        id: '1',
        name: 'Completed Task',
        status: 1,
      },
      {
        id: '2',
        name: 'Incomplete Task',
        status: 0,
      },
    ],
    view: 0
  };

  onToggleComplete = (task) => {
    console.log(task);
    const tasks = [...this.state.tasks];
    const index = tasks.indexOf(task);
    task.status = 1 ^ task.status;
    tasks[index] = { ...task };
    this.setState({ tasks });
  };

  onInputHandler = (todo) => {
    if (todo == '') {
      alert('Empty Task');
      return;
    }
    const lastIndex = this.state.lastIndex + 1;
    const tasks = [...this.state.tasks];
    tasks.push({
      id: "" + lastIndex,
      name: todo,
      status: 0,
    });
    const displayTasks = [...this.state.displayTasks];
    if (this.state.view == 0 || this.state.view == 1) {
      displayTasks.push({
        id: "" + lastIndex,
        name: todo,
        status: 0,
      });
    }
    this.setState({ tasks, lastIndex, displayTasks });
  }

  deleteTodo = (todoId, ev) => {
    const tasks = this.state.tasks.filter(task => task.id != todoId);
    const displayTasks = this.state.displayTasks.filter(task => task.id != todoId);
    this.setState({ tasks, displayTasks });
    ev.stopPropagation();
  };

  defaultView = () => {
    const displayTasks = [...this.state.tasks];
    const view = 0;
    this.setState({ displayTasks, view });
  }

  completedTasksView = () => {
    const allTasks = [...this.state.tasks];
    const displayTasks = allTasks.filter(task => task.status == 1)
    const view = 2;
    this.setState({ displayTasks, view });
  }

  incompleteTasksView = () => {
    console.log('clicked');
    const allTasks = [...this.state.tasks];
    const displayTasks = allTasks.filter(task => task.status == 0)
    const view = 1;
    this.setState({ displayTasks, view });
  }

  render() {
    return (
      <div className='body'>
        <AddTask onAdd={this.onInputHandler} />
        <Tasks toggleTask={this.onToggleComplete} onDelete={this.deleteTodo} tasks={this.state.displayTasks} />
        <div className="buttonContainer">
          <button onClick={this.defaultView}>All Tasks</button>
          <button onClick={this.incompleteTasksView}>Incomplete Tasks</button>
          <button onClick={this.completedTasksView}>Completed Tasks</button>
        </div>
      </div >
    );
  }
}

export default App;
