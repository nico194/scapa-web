import React, { useState } from 'react'

export default function Paginator({ previousPage, currentPage, totalPage, nextPage, goToPreviousPage, goToNextPage, goToSpecificPage, isFull }) {
	const initialStateFinalValue = totalPage < 10 ? totalPage : 10
	
	const [pageSelected, setPageSelected] = useState(currentPage)
	const [initValue, setInitValue] = useState(1)
	const [finalValue, setFinalValue] = useState(initialStateFinalValue)

	const setSpecificPage = (index) => {
		setPageSelected(index)
		goToSpecificPage(index)
	}

	const handleNextPage = () => {
		if(pageSelected === finalValue && pageSelected < totalPage) {
			setPageSelected(pageSelected + 1)
			setFinalValue(finalValue + 1)
			setInitValue(initValue + 1)	
		}
		goToNextPage()
	}

	const handlePreviousPage = () => {
		if(pageSelected === initValue && pageSelected > 1) {
			setPageSelected(pageSelected + 1)
			setFinalValue(finalValue + 1)
			setInitValue(initValue + 1)	
		}
		goToPreviousPage()
	}

	const pages = () => {
		const paginationLinks = [];
		for (let index = initValue; index <= finalValue; index++) {
			paginationLinks.push(
				<li
					key={index}
					className={`page-item ${currentPage === index ? 'active' : ''}`}
					aria-current='page'>
					<span onClick={() => setSpecificPage(index)} className='page-link'>
						{index}
					</span>
				</li>
			)
		}
		return paginationLinks
	}
	return (
		<nav aria-label='paginator'>
			<ul className='pagination justify-content-center'>
				<li className={`page-item ${!previousPage ? 'disabled' : ''} `}>
					<span onClick={handlePreviousPage} className='page-link'>Anterior</span>
				</li>
				{
					isFull &&
					<>
						<li className={`page-item ${!previousPage ? 'disabled' : ''} `}>
							<span onClick={handlePreviousPage} className='page-link'>{'<'}</span>
						</li>
						<li className='page-item disabled'>
							<span className='page-link'>{'...'}</span>
						</li>
					</>
				}
				
				{pages()}
				{
					isFull &&
					<>
						<li className='page-item disabled'>
							<span className='page-link'>{'...'}</span>
						</li>
						<li className={`page-item ${!nextPage ? 'disabled' : ''} `}>
							<span onClick={handleNextPage} className='page-link'>{'>'}</span>
						</li>
					</>
				}
				<li className={`page-item ${!nextPage ? 'disabled' : ''} `}>
					<span onClick={handleNextPage} className='page-link' >Siguiente</span>
				</li>
			</ul>
		</nav>
	)
}
