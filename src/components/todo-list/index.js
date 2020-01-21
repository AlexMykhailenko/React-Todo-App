/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';

import TodoListItem from '../todo-list-item';
import './todo-list.css';

const TodoList = (props) => {
    const {
        todos, onDeleted, onToggleImportant, onToggleDone,
    } = props;
    const elements = todos.map((item) => {
        const { id, ...itemProps } = item;
        return (
            <li key={id} className="list-group-item">
                <TodoListItem
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...itemProps}
                    onDelete={() => onDeleted(id)}
                    onToggleImportant={() => onToggleImportant(id)}
                    onToggleDone={() => onToggleDone(id)}
                />
            </li>
        );
    });

    return (
        <ul className="list-group todo-list">
            {elements}
        </ul>
    );
};

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
    onDeleted: PropTypes.func,
    onToggleImportant: PropTypes.func,
    onToggleDone: PropTypes.func,
};

export default TodoList;
