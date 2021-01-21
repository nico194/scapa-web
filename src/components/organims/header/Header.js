import { Link } from 'react-router-dom';
import navigation from '../../../configs/navigation';

export default function Header() {

    const linkList = navigation.map((link, index) => (
        <li className='nav-item mx-3' key={index}>
            <Link className='nav-link active' to={link.goto}>{link.text}</Link>
        </li>
    ));

    return (
        <nav className='d-fex flex-row  navbar navbar-dark bg-primary mb-4 shadow'>
            <div className='container-fluid'>
                <span className='navbar-brand mb-0 h1 mx-3'>SCAPA</span>
                <ul className='d-flex flex-row navbar-nav'>
                    { linkList }
                </ul>
            </div>
        </nav>        
    )
}
