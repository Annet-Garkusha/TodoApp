import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';
import './todo-app.css';

export default class TodoApp extends Component {
  static defaultProps = {
    deleteItem: () => {},
    addItem: () => {},
    onToggleDone: () => {},
    headerText: 'todos',
  };

  static propTypes = {
    deleteItem: PropTypes.func,
    addItem: PropTypes.func,
    onToggleDone: PropTypes.func,
    headerText: PropTypes.string,
  };
  maxId = 100;

  state = {
    taskData: [
      { id: 1, taskStatus: 'completed', description: 'Drink coffee', createdTime: new Date() },

      { id: 3, taskStatus: 'active', description: 'Learn React', createdTime: new Date() },
    ],
    flag: 'All',
  };

  deleteItem = (id) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id);
      const [...coryArr] = taskData;
      coryArr.splice(idx, 1);

      return {
        taskData: coryArr,
      };
    });
  };

  addItem = (text) => {
    const newItem = {
      description: text,
      createdTime: new Date(),
      taskStatus: this.state.taskStatus,
      id: this.maxId++,
      done: false,
      edit: false,
    };

    this.setState(({ taskData }) => {
      const newArr = [...taskData, newItem];

      return {
        taskData: newArr,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id);

      const oldItem = taskData[idx];
      const newItem = { ...oldItem, done: !oldItem.done };

      const newArr = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)];

      return {
        taskData: newArr,
      };
    });
  };

  activeItem = () => {
    const { taskData, flag } = this.state;
    switch (flag) {
      case 'Completed':
        return taskData.filter((el) => el.done);
      case 'Active':
        return taskData.filter((el) => !el.done);
      default:
        return taskData;
    }
  };

  onToggleFilter = (flag) => {
    this.setState({
      flag,
    });
  };

  clearFilter = () => {
    this.setState(({ taskData }) => {
      let filter = taskData.filter((el) => !el.done);
      return {
        taskData: filter,
      };
    });
  };

  editingItem = (id, edit) => {
    const { taskData } = this.state;
    const newTask = taskData.map((el) => {
      if (el.id === id) {
        return { ...el, edit: !edit };
      }
      return el;
    });
    this.setState({
      taskData: newTask,
    });
  };

  saveCurrentText = (text, id, edit) => {
    const { taskData } = this.state;
    const newTask = taskData.map((el) => {
      if (el.id === id) {
        return { ...el, description: text, edit: !edit };
      }
      return el;
    });

    this.setState(({ taskData }) => {
      return { taskData: newTask };
    });
  };

  render() {
    let todos = this.activeItem();

    const doneCount = this.state.taskData.filter((el) => el.done).length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>{this.props.headerText}</h1>
          <NewTaskForm addItem={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todos={todos}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            editingItem={this.editingItem}
            saveCurrentText={this.saveCurrentText}
          />
          <Footer
            done={doneCount}
            todos={this.state.taskData}
            onToggleDone={this.onToggleFilter}
            flag={this.state.flag}
            clearFilter={this.clearFilter}
          />
        </section>
      </section>
    );
  }
}
