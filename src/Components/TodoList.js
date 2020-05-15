import React, { Component } from 'react';
import { TodoItem } from './Item/TodoItem';

export class TodoList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { items, onCheckItem, onDeleteItem, onUpdateItemValue } = this.props;

		return (
			<div className="main">
				<ul className="main__list">
					{items.map((item) => {
						return <li
							key={item.id}
							className="main__item"
						>
							<TodoItem
								item={item}
								onCheckItem={onCheckItem}
								onDeleteItem={onDeleteItem}
								onUpdateItemValue={onUpdateItemValue}
							/>
						</li>
					})}
				</ul>
			</div>
		)
	}
}