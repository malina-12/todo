import React from 'react';
import { TodoItem } from './Item/TodoItem';

const TodoList = ({items, onCheckItem, onDeleteItem, onUpdateItemValue}) => {
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
							onUpdateItemValue={onUpdateItemValue}
						/>
					</li>
				})}
			</ul>
		</div>
	)
}

export default TodoList