import React, { Component } from 'react';
import './app.css';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import TodoList from '../todo-list';
import ItemAddForm from '../item-add-form';

export default class App extends Component {
    static search(items, term) {
        if (term.length === 0) {
            return items;
        }
        return items.filter((item) => item.label.toLowerCase().indexOf(term.toLowerCase()) > -1);
    }

    static filter(items, filter) {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }

    constructor() {
        super();
        this.maxId = 100;
        this.state = {
            todoData: [
                this.createTodoItem('Have a breackfast'),
                this.createTodoItem('Workout'),
                this.createTodoItem('Do homework'),
                this.createTodoItem('To cheer up'),
            ],
            term: '',
            filterValue: 'all',
        };
    }

    createTodoItem = (label) => ({
        label,
        done: false,
        important: false,
        // eslint-disable-next-line no-plusplus
        id: this.maxId++,
    });

    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        this.setState(({ todoData }) => {
            const newArray = [
                ...todoData,
                newItem,
            ];
            return {
                todoData: newArray,
            };
        });
    };

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);

            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1),
            ];

            return {
                todoData: newArray,
            };
        });
    };

    onSearchChange = (term) => {
        this.setState({ term });
    };

    onFilterChange = (filterValue) => {
        this.setState({ filterValue });
    };

    toggleProperty = (arr, id, propName) => {
        const idx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[idx];
        const newItem = { ...oldItem, [propName]: !oldItem[propName] };

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1),
        ];
    };

    onToggleDone = (id) => {
        this.setState(({ todoData }) => ({
            todoData: this.toggleProperty(todoData, id, 'done'),
        }));
    };

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => ({
            todoData: this.toggleProperty(todoData, id, 'important'),
        }));
    };

    render() {
        const { todoData, term, filterValue } = this.state;

        // eslint-disable-next-line max-len
        const visibleItems = this.constructor.filter(this.constructor.search(todoData, term), filterValue);

        const doneCount = todoData.filter((el) => el.done).length;

        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />

                <div className="top-panel d-flex">
                    <SearchPanel
                        onSearchChange={this.onSearchChange}
                    />
                    <ItemStatusFilter
                        filterValue={filterValue}
                        onFilterChange={this.onFilterChange}
                    />
                </div>

                <TodoList
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />

                <ItemAddForm
                    onItemAdded={this.addItem}
                />
            </div>
        );
    }
}
