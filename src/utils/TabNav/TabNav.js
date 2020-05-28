import React from 'react';

const TabNav = ({ activeTab, options, onSwitchTab }) => {

		return (
			<div className="todo__header">
				<ul className="todo__nav">
					{options.map(option => (
						<li key={option.id}
							className={activeTab===option.label ? "nav__tab active" : "nav__tab"}
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

export default TabNav
