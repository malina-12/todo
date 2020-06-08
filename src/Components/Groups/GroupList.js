import React from "react";
import Group from "./Group.js";

const GroupList = ({
  groups,
  currentGroup,
  createNewGroup,
  switchGroup,
  renameGroup,
  deleteGroup,
}) => {
  return (
    <div className="todo__group">
      <div className="todo__create-group" onClick={createNewGroup}>
        Create new group
      </div>
      <ul className="group__list">
        {groups.map((group) => {
          return (
            <li
              key={group.id}
              className={
                currentGroup === group.id
                  ? "group__item current"
                  : "group__item"
              }
              onClick={() => {
                switchGroup(group.id);
              }}
            >
              <Group
                {...group}
                renameGroup={renameGroup}
                deleteGroup={deleteGroup}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GroupList;
