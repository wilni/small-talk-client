
import './Header.scss'
import logo from '../../assets/Images/logo-option4.svg';
import LoginBtn from '../LoginBtn/LoginBtn.js';
import LogoutBtn from '../LogoutBtn/LogoutBtn.js';
import { useHistory } from 'react-router-dom';


function Header(props) {
    const history = useHistory();
    let handleClick = (e) => {
        e.preventDefault();
        history.push("/");
    }
    return (
        <header className='header'>
            <img className='header__logo' src={logo} alt="logo"></img>
            <nav className='navbar'>
                <button className={'navbar__link'} onClick={handleClick}>Connections</button>
                <LoginBtn >Login</LoginBtn>
    
                <LogoutBtn >Logout</LogoutBtn>
            </nav>
        </header>
    )
}



export default Header;