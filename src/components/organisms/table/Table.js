import React from 'react';

export default function Table({ thead, tbody }) {
    const tableHead = thead.map( (head, index) => ( <th key={index} scope='col'>{ head }</th> ));
    return (
        <table className='table'>
            <thead>
                <tr>
                    { tableHead }
                </tr>
            </thead>
            <tbody>
                { tbody }
            </tbody>
        </table> 
    )
}
