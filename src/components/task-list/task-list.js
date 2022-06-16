import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task';
import './task-list.css';

const TaskList = ({ onDeleted, todos, onToggleDone, editingItem, saveCurrentText }) => {
  TaskList.defaultProps = {
    onDeleted: () => {},
    onToggleDone: () => {},
    editingItem: () => {},
    saveCurrentText: () => {},
  }

  TaskList.propTypes = {
    todos: PropTypes.array,
  }

  const elements = todos.map((item) => (
    <Task
      {...item}
      onDeleted={() => onDeleted(item.id)}
      onToggleDone={() => onToggleDone(item.id)}
      key={item.id}
      editingItem={editingItem}
      saveCurrentText={saveCurrentText}
    />
  ))
  return <ul className="todo-list">{elements}</ul>
}

export default TaskList;