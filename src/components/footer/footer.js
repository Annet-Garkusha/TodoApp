import React, { useState } from 'react';

import TasksFilter from '../tasks-filter/tasks-filter';
import './footer.css';

const Footer = (props) => {
  const [itemsLeft] = useState('items left');
  const [clearCompleted] = useState('Clear completed');

  return (
    <footer className="footer">
      <span className="todo-count">
        {props.done} {itemsLeft}
      </span>
      <TasksFilter taskData={props.todos} onToggleFilter={props.onToggleDone} flag={props.flag} />
      <button className="clear-completed" onClick={props.clearFilter}>
        {clearCompleted}
      </button>
    </footer>
  );
};

export default Footer;
