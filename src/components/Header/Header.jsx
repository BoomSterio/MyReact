import logo from "../../assets/images/logoBID3s.png";
import st from './Header.module.css';
import {NavLink} from "react-router-dom";

function Header(props) {
    return (
        <header className={st.header}>
            <div className={st.img}><img src={logo} alt="logo"/></div>
            <div className={st.slogan}>No hOOman zone.</div>
            <div className={st.loginBlock}>
                {props.isAuth
                    ? <NavLink to="/profile">{props.login}</NavLink>
                    : <NavLink to="/login">login</NavLink>
                }
            </div>
        </header>
    );
}

export default Header;
