import React from 'react'

export default function Select({ label, options, onChange, value }) {
	return (
		<div>
			<label className='form-label'>{label}</label>
			<select
				className='form-select mb-3'
				aria-label='Default select'
				value={value}
				onChange={onChange}
			>
				{options}
			</select>
		</div>
	)
}
