import React from 'react'

export default function Spinner({ type = 'dark' }) {
	return (
		<div className={`spinner-border text-${type}`} role='status'>
			<span className='visually-hidden'>Loading...</span>
		</div>
	)
}
