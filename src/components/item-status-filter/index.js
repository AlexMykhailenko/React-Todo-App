import React, { Component } from 'react';

import './item-status-filter.css';

class ItemStatusFilter extends Component {
    constructor() {
        super();
        this.state = {
            buttons: [
                { name: 'all', label: 'All' },
                { name: 'active', label: 'Active' },
                { name: 'done', label: 'Done' },
            ],
        };
    }

    render() {
        const { filterValue, onFilterChange } = this.props;
        const buttons = this.state.buttons.map(({ name, label }) => {
            const isActive = filterValue === name;
            const classNames = isActive ? 'btn-info' : 'btn-outline-secondary';

            return (
                <button
                    className={`btn ${classNames}`}
                    type="button"
                    key={name}
                    onClick={() => onFilterChange(name)}
                >
                    {label}
                </button>
            );
        });

        return (
            <div className="btn-group">
                {buttons}
            </div>
        );
    }
}

export default ItemStatusFilter;
