import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss'

export default function Modal({ children }) {
    
    const node = (
        <div className='modalContainer'>
            <div className='modalBox'>
                { children }
            </div>
        </div>
    )

    return ReactDOM.createPortal(node, document.getElementById('modal-root'));
}
