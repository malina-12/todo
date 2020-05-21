import React, { Component } from 'react';
import { GroupInput } from './GroupInput.js'

export class GroupList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { groups, currentGroup, createNewGroup, onSwitchGroup, onRenameGroup, onDeleteGroup } = this.props;
		
		return (
			<div className="todo__group">
				<div 
					className="todo__create-group" 
					onClick={ createNewGroup }>
					Create new group
				</div>
				<ul className="group__list">
					{groups.map(group => {
						return <li
							key={group.id}
							className={currentGroup === group.id ? "group__item current" : "group__item"}
							onClick={() => {
									onSwitchGroup(group.id);
								}}
						>
							<GroupInput
								{...group}
								onRenameGroup={onRenameGroup}
								onDeleteGroup={onDeleteGroup}
							/>
						</li>
					})}
				</ul>
			</div>
		)
	}
}