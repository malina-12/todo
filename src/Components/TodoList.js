import React, { Component } from 'react';
import { TodoItem } from './Item/TodoItem';

export class TodoList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { items, onCheckItem, onDeleteItem, onInputBlur, onInputChange } = this.props;

		return (
			<div className="main">
				<ul className="main__list">
					{items.map((item) => {
						return <li 
									key={item.id} 
									className="main__item"
								>
									<TodoItem
										{...item}
										onCheckItem={onCheckItem}
										onDeleteItem={onDeleteItem}
										onInputBlur={onInputBlur}
										onInputChange={onInputChange}
									/>
								</li>
					})}
				</ul>
			</div>
		)
	}
}