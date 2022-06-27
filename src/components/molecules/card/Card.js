import React from 'react'

export default function Card({ children, image }) {
	return (
		<div className='card shadow mx-3'>
			{
				image &&
				<img src={image} className='card-img-top' alt='alternative' />
			}{
				children &&
				<div className='card-body'>
					{children}
				</div>
			}
		</div>
	)
}
