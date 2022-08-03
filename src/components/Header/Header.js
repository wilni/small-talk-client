
import './Header.scss'
import logo from '../../assets/Images/logo-option6.svg';
import LoginBtn from '../LoginBtn/LoginBtn.js';
import LogoutBtn from '../LogoutBtn/LogoutBtn.js';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";


function Header(props) {
    const { isAuthenticated } = useAuth0();
    console.log("from header", isAuthenticated);
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
                {isAuthenticated?<LogoutBtn >Logout</LogoutBtn>: <LoginBtn >Login</LoginBtn>}
            </nav>
        </header>
    )
}



export default Header;