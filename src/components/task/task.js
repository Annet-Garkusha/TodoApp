import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { PropTypes } from 'prop-types';

import './task.css';

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
    timeLeft: 12.45 * 60,
    isCounting: false,
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

  componentDidMount() {
    this.interval = setInterval(() => {
      this.state.isCounting && this.setState({ timeLeft: this.state.timeLeft >= 1 ? this.state.timeLeft - 1 : 0 });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handlePlay = () => {
    this.setState({ isCounting: true });
  };
  handlePause = () => {
    this.setState({ isCounting: false });
  };

  render() {
    const { taskStatus, createdTime, id, onDeleted, onToggleDone, done, description, edit, editingItem } = this.props;
    const { value, timeLeft, isCounting } = this.state;
    let classNames = '';
    if (done) {
      classNames += 'description';
    }

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;

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
                {isCounting ? (
                  <button className="timer" onClick={this.handlePause}>
                    pause
                  </button>
                ) : (
                  <button className="timer" onClick={this.handlePlay}>
                    play
                  </button>
                )}
                <div className="clock">
                  <div> {minutes}</div>
                  <div>:</div>
                  <div>{seconds}</div>
                </div>
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
