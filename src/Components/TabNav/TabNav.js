import React, { Component } from 'react';

export class TabNav extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { activeTab, options, onSwitchTab } = this.props;
		const isActive = activeTab === options.label;

		return (
			<div className="todo__header">
				<ul className="todo__nav">
					{options.map(option => (
						<li key={option.id}
							className={activeTab===option.label ? 'nav__tab active' : 'nav__tab'}
						>
							<button className="todo__btn"
								onClick={() => {
									onSwitchTab(option.id);
								}}
							>
								{option.label}
							</button>
						</li>
					))}
				</ul>
			</div>
		)
	}
}
