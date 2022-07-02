import React, { useState } from 'react';

import './new-task-form.css';

const NewTaskForm = (props) => {
  const [placeHolderText] = useState('What needs to be done?');
  const [label, setLabel] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    props.addItem(label);
    setLabel('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        className="new-todo"
        placeholder={placeHolderText}
        autoFocus
        onChange={(e) => setLabel(e.target.value)}
        value={label}
      ></input>
    </form>
  );
};

export default NewTaskForm;
