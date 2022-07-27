import { NavLink } from 'react-router-dom';
import './Header.scss';
import logo from '../../assets/Images/logo-option4.svg';


function Header(props) {
    return (
        <header className='header'>
            <img className='header__logo' src={logo} alt="logo"></img>
            <nav className='navbar'>
                <NavLink className={'navbar__link'} to={'/'}>Connections</NavLink>
                <NavLink className={'navbar__link'} to={'/login'}>Login</NavLink>
            </nav>
        </header>
    )
}



export default Header;