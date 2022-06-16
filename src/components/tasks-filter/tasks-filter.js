import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './tasks-filter.css';

export default class TasksFilter extends Component {
  static defaultProps = {
    onToggleFilter: () => {},
    filters: ['All', 'Completed', 'Active'],
  };

  static propTypes = {
    onToggleFilter: PropTypes.func,
    filters: PropTypes.array,
  };

  render() {
    const { flag, onToggleFilter } = this.props;

    return (
      <ul className="filters">
        {this.props.filters.map((f, index) => (
          <li key={index}>
            <button className={flag === f ? 'selected' : ''} onClick={(e) => onToggleFilter(e.target.textContent)}>
              {f}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}
