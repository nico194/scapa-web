import React from 'react'

export default function Card({ children }) {
    return (
        <div className='card shadow'>
            <div className='card-body'>
                { children }    		    
            </div>
        </div>
    )
}
