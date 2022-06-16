import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends Component {
  static defaultProps = {
    onChangeInput: () => {},
    saveText: () => {},
  };

  static propTypes = {
    onChangeInput: PropTypes.func,
    saveText: PropTypes.func,
  };

  state = {
    value: this.props.description,
  };

  onChangeInput = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  saveText = (e) => {
    const { value } = this.state;
    const { id, edit } = this.props;
    if (e.key === 'Enter') {
      this.props.saveCurrentText(value, id, edit);
    }
  };

  render() {
    const { taskStatus, createdTime, id, onDeleted, onToggleDone, done, description, edit, editingItem } = this.props;
    const { value } = this.state;
    let classNames = '';
    if (done) {
      classNames += 'description';
    }

    return (
      <li className={taskStatus} key={id}>
        <div className="view">
          {edit === true ? (
            <label>
              <input
                className="editinput"
                onChange={this.onChangeInput}
                value={value}
                onKeyDown={(e) => this.saveText(e)}
              ></input>
            </label>
          ) : (
            <>
              <input className="toggle" type="checkbox" onClick={onToggleDone} defaultChecked={done} />
              <label>
                <span className={classNames}>{description}</span>
                <span className="created"> created {formatDistanceToNow(createdTime)}</span>
              </label>
              <button className="icon icon-edit" onClick={() => editingItem(id, edit)}></button>
              <button className="icon icon-destroy" onClick={onDeleted}></button>
            </>
          )}
        </div>
      </li>
    );
  }
}
