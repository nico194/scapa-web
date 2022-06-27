import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import navigation from '../../../configs/navigation';
import { logOut } from '../../../redux/actions/users';
import Spinner from '../../atoms/spinner/Spinner'

export default function Header() {

    
    const dispatch = useDispatch();
    const { user, loading, login } = useSelector(state => state.users)
    
    useEffect(() => {
        if (!login) window.location.href = '/admin'
    }, [login])

    const linkList = navigation.map((link, index) => (
        <li className='nav-item mx-3' key={index}>
            <Link className='nav-link active' to={link.goto}>{link.text}</Link>
        </li>
    ));

    const logOutUser = () => {
        dispatch(logOut(user));
    }

    return (
        <nav className='d-fex flex-row  navbar navbar-dark bg-primary mb-4 shadow'>
            <div className='container-fluid'>
                <span className='navbar-brand mb-0 h1 mx-3'>SCAPA</span>
                <ul className='d-flex flex-row navbar-nav'>
                    { linkList }
                    <li style={{ cursor: 'pointer' }} className='nav-item mx-3' onClick={logOutUser}>                        
                        { loading ? <Spinner type='light' /> : <span className='nav-link active'>Salir</span> }
                    </li>
                </ul>
            </div>
        </nav>        
    )
}
