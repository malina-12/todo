import React from "react";
import { TodoItem } from "./Item/TodoItem";

const TodoList = ({ items, onCheckItem, onDeleteItem, onUpdateItemValue, onAddItem }) => {
  return (
    <div className="main">
      <ul className="main__list">
        {items.map((item) => {
          return (
            <li key={item.id} className="main__item">
              <TodoItem
                {...item}
                onCheckItem={() => onCheckItem(item.id)}
                onDeleteItem={() => onDeleteItem(item.id)}
                onUpdateItemValue={onUpdateItemValue}
                onAddItem={onAddItem}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;