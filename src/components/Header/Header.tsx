import logo from "../../assets/images/logoBID3s.png";
import st from './Header.module.css';
import {NavLink} from "react-router-dom";
import React from "react";

type Props = {
    isAuth: boolean
    login: string | null
    logout: () => void
}

//todo: change logo and design login/logout btn
const Header: React.FC<Props> = (props) => {
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
