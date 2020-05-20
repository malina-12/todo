import React, { Component } from "react";
import firstPage from '../Images/arrow-first.png';
import prevPage from '../Images/arrow-prev.png';
import nextPage from '../Images/arrow-next.png';
import lastPage from '../Images/arrow-last.png';


export class Pagination extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div className='pages'>
				<button 
					type='button'
				>
					<img 
						src={firstPage} 
						alt='first page' />
				</button>

				<button 
					type='button'
					onClick={this.props.switchToPrevPage}
				>
					<img 
						src={prevPage} 
						alt='previous page' />
				</button>

				<span className="pages__current">{this.props.currentPage}</span>

				<button 
				type='button'
					onClick={this.props.switchToNextPage}
				>
					<img 
						src={nextPage} 
						alt='next page' />
				</button>

				<button type='button'
				>
					<img 
						src={lastPage} 
						alt='last page' />
				</button>
			</div>
		)
	}
}