import React, { Component } from 'react';

export class TabNav extends Component {
	constructor(props) {
		super(props);

	}

	render() {

		return (
			<div className="todo__header">
				<ul className="todo__nav">
					{this.props.options.map(option => (
						<li key={option.id}
							className="nav__tab"
						>
							<button className="todo__btn"
								onClick={() => {
									this.props.onSwitchTab(option.id)
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
