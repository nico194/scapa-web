import React from 'react'

export default function Paginator({ previousPage, currentPage, totalPage, nextPage, goToPreviousPage, goToNextPage, goToSpecificPage  }) {

    const setSpecificPage = (index) => {
        goToSpecificPage(index)
    }

    const pages = () => {
        const paginationLinks = [];
        for (let index = 1; index <= totalPage; index++) {
            paginationLinks.push(<li key={index} className={`page-item ${ currentPage === index ? 'active' : '' }`} aria-current='page'><span onClick={() => setSpecificPage(index)} className='page-link'>{ index }</span></li>)     
        }
        return paginationLinks
    }
    return (
        <nav aria-label='paginator'>
            <ul className='pagination justify-content-center'>
                <li className={`page-item ${ !previousPage ? 'disabled': '' } `}>
                    <span onClick={goToPreviousPage} className='page-link'>Anterior</span>
                </li>
                { pages() }
                <li className={`page-item ${ !nextPage ? 'disabled': '' } `}>
                    <span onClick={goToNextPage} className='page-link' >Siguiente</span>
                </li>
            </ul>
        </nav>
    )
}
