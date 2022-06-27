import React, { useEffect, useState } from 'react'

export default function Paginator({ currentPage, totalPage, goToPreviousPage, goToNextPage, goToSpecificPage  }) {

    const nextPagination = 10;
    const [firstPage, setFirstPage] = useState(1)
    const [first, setFirst] = useState(false);
    const [last, setLast] = useState(true);
    const [pages , setPages] = useState([]);

    const getPagination = (start, end) => {
        const pagination = [];
        for (let index = start; index <= end; index++) {
            pagination.push(index)    
        };
        return pagination
    }

    useEffect(() => {
        setPages(getPagination(firstPage, nextPagination));
    }, [])
    
    const modifyPaginator = (operation) => {
        const pagination = getPaginator(operation);
        pagination[0] === 1 ? setFirst(false) : setFirst(true)
        pagination[pagination.length - 1] === totalPage ? setLast(false) : setLast(true); 
        setFirstPage(pagination[0]);
        setPages(pagination);
    }

    const getPaginator = (operation) => {
        switch (operation) {
            case 'add':
                return pages.map( page => page + nextPagination );
            case 'subtract':
                return pages.map( page => page - nextPagination );
            case 'first':
                return getPagination(1, nextPagination);
            case 'last':
                return getPagination(totalPage - nextPagination, totalPage);
            default:
                return [];
        }

    }

    const setSpecificPage = (index) => {
        goToSpecificPage(index)
    }

    const pagesPaginator = pages.map( page => {
        return (
            <li 
                key={page}
                style={{ cursor: 'pointer'}}
                className={`page-item ${ currentPage === page ? 'active' : '' }`} 
                aria-current='page'
                >
                <span onClick={() => setSpecificPage(page)} className='page-link'>
                    { page }
                </span>
            </li>
        )
    })

    return (
        <nav aria-label='paginator'>
            <ul className='pagination justify-content-center'>
                <li style={{ cursor: 'pointer'}} className={`page-item ${ currentPage === 1 ? 'disabled': '' } `}>
                    <span onClick={goToPreviousPage} className='page-link'>Anterior</span>
                </li>
                {
                    first &&
                        <>
                            <li style={{ cursor: 'pointer'}} className="page-item">
                                <span onClick={ () => modifyPaginator('first')} className='page-link'>{ '<<' }</span>
                            </li>
                            <li style={{ cursor: 'pointer'}} className="page-item">
                                <span onClick={ () => modifyPaginator('subtract')} className='page-link'>{ '<' }</span>
                            </li>                            
                        </>
                }
                { pagesPaginator }
                {
                    last &&
                        <>
                            <li style={{ cursor: 'pointer'}} className="page-item">
                                <span onClick={ () => modifyPaginator('add')} className='page-link'>{ '>' }</span>
                            </li>
                            <li style={{ cursor: 'pointer'}} className="page-item">
                                <span onClick={ () => modifyPaginator('last')} className='page-link'>{ '>>' }</span>
                            </li>
                        </>
                }
                <li style={{ cursor: 'pointer'}} className={`page-item ${ currentPage === totalPage ? 'disabled': '' } `}>
                    <span onClick={goToNextPage} className='page-link' >Siguiente</span>
                </li>
            </ul>
        </nav>
    )
}
