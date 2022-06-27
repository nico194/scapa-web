import React from 'react'

export default function Input({ onChange, label, placeholer, type, value }) {
	return (
		<div className='mb-3'>
			<label className='form-label'>{label}</label>
			<input type={type}
				className='form-control'
				onChange={onChange}
				placeholder={placeholer}
				value={value}
			/>
		</div>
	)
}
