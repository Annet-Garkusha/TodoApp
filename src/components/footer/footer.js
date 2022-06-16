import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../tasks-filter/tasks-filter';
import './footer.css';

export default class Footer extends Component {
  static defaultProps = {
    itemsLeft: 'items left',
    clearCompleted: 'Clear completed',
    clearFilter: () => {},
  };

  static propTypes = {
    itemsLeft: PropTypes.string,
    clearCompleted: PropTypes.string,
    clearFilter: PropTypes.func,
  };
  render() {
    return (
      <footer className="footer">
        <span className="todo-count">
          {this.props.done} {this.props.itemsLeft}
        </span>
        <TasksFilter taskData={this.props.todos} onToggleFilter={this.props.onToggleDone} flag={this.props.flag} />
        <button className="clear-completed" onClick={this.props.clearFilter}>
          {this.props.clearCompleted}
        </button>
      </footer>
    );
  }
}
