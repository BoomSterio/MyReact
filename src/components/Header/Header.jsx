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
                    ?
                    <div>
                        <div>
                            <NavLink to="/profile">{props.login}</NavLink>
                        </div>
                        <div>
                            <button onClick={props.logout}>Log out</button>
                        </div>
                    </div>
                    :
                    <div>
                        <NavLink to="/login"><button>Log in</button></NavLink>
                    </div>
                }
            </div>
        </header>
    );
}

export default Header;
