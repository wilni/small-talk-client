import { NavLink } from 'react-router-dom';
import './Header.scss';
import logo from '../../assets/Images/logo-option5.svg';


function Header(props) {
    return (
        <header>
            <img src={logo}></img>
            <nav className='navbar'>
                <NavLink to={'/'}>Connections</NavLink>
                <NavLink to={'/'}>Login</NavLink>
            </nav>
        </header>
    )
}



export default Header;