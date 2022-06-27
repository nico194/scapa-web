import React from 'react'

export default function Alert({ type = 'danger', message = '', onClick }) {
  return (
    <div>
      <div onClick={onClick} className={`alert alert-${type}`} role='alert'>
        {message}
      </div>
    </div>
  )
}
