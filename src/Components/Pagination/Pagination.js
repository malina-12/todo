import React from "react";
import firstPage from '../../Images/arrow-first.png';
import prevPage from '../../Images/arrow-prev.png';
import nextPage from '../../Images/arrow-next.png';
import lastPage from '../../Images/arrow-last.png';


const Pagination = ({ currentPage, switchToFirstPage, switchToPrevPage, switchToNextPage, switchToLastPage }) => {
	return (
		<div className='pages'>
			<button
				type='button'
				onClick={switchToFirstPage}
			>
				<img
					src={firstPage}
					alt='first page' />
			</button>

			<button
				type='button'
				onClick={switchToPrevPage}
			>
				<img
					src={prevPage}
					alt='previous page' />
			</button>

			<span className="pages__current">{currentPage}</span>

			<button
				type='button'
				onClick={switchToNextPage}
			>
				<img
					src={nextPage}
					alt='next page' />
			</button>

			<button
				type='button'
				onClick={switchToLastPage}
			>
				<img
					src={lastPage}
					alt='last page' />
			</button>
		</div>
	)
}

export default Pagination