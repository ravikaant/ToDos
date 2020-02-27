import React, { Component } from 'react';
import './App.scss';
import AddTaskPage from './components/addTask'
import TaskPage from './components/tasks';
import { connect } from 'react-redux';
import { changeFilter } from './js/action/index'

function mapStateToProps(state) {
  return { view: state.view };
}

function mapDispatchToProps(dispatch) {
  return { changeFilter: view => dispatch(changeFilter(view)) };
}

class App extends Component {
  render() {
    return (
      <div className='body'>
        <h1>Todo </h1>
        <AddTaskPage />
        <div className="filters">
          <button className={this.props.view === 'ALL' ? 'filter active' : 'filter'} onClick={() => this.props.changeFilter('ALL')}>All Tasks</button>
          <button className={this.props.view === 'INCOMPLETE' ? 'filter active' : 'filter'} onClick={() => this.props.changeFilter('INCOMPLETE')}>Incomplete Tasks</button>
          <button className={this.props.view === 'COMPLETE' ? 'filter active' : 'filter'} onClick={() => this.props.changeFilter('COMPLETE')}>Completed Tasks</button>
        </div>
        <TaskPage />
      </div >
    );
  }
}

const MainPage = connect(mapStateToProps, mapDispatchToProps)(App)

export default MainPage;