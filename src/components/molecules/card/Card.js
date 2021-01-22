import React from 'react'

export default function Card({ children }) {
    return (
        <div className='card shadow mx-3'>
            <div className='card-body'>
                { children }    		    
            </div>
        </div>
    )
}
