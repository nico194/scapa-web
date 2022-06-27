import React from 'react'

export default function UploadImage({ onChange, label, placeholer, type, src, alt }) {
    return (
        <div className='d-flex flex-column'>
            <div className='mb-3'>
                <label className='form-label'>{ label }</label>
                <input type={type} 
                    className='form-control' 
                    onChange={ onChange } 
                    placeholder={ placeholer }
                    />
            </div>
            <div className='w-full align-self-center'>
                <img style={{ height: 150}} src={src} alt={alt}/>
            </div>
        </div>
    )
}