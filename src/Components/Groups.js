import React, { Component } from 'react';
import { Group } from './Group.js'

export class Groups extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { groups, createNewGroup, onRenameGroup, onDeleteGroup } = this.props;

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
							className={"group__item"}
						>
							<Group
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