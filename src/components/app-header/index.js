/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-one-expression-per-line */

import React from 'react';
import PropTypes from 'prop-types';
import './app-header.css';

const AppHeader = ({ toDo, done }) => (
    <div className="app-header d-flex">
        <h1>My Todo List</h1>
        <h2>{toDo} more to do, {done} done</h2>
    </div>
);

AppHeader.propTypes = {
    toDo: PropTypes.number,
    done: PropTypes.number,
};

export default AppHeader;
