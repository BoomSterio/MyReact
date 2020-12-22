import st from './Navbar.module.css';
import {NavLink} from "react-router-dom";

/*to do: картинки вместо ссылок*/
function Navbar() {
    return (
        <nav className={st.nav}>
            <div className={st.item}>
                <NavLink to="/profile" activeClassName={st.active}>Profile</NavLink>
            </div>
            <div className={st.item}>
                <NavLink to="/dialogs" activeClassName={st.active}>Messages</NavLink>
            </div>
            <div className={st.item}>
                <NavLink to="/feed" activeClassName={st.active}>Feed</NavLink>
            </div>
            <div className={st.item}>
                <NavLink to="/users" activeClassName={st.active}>Users</NavLink>
            </div>
            <div className={st.item}>
                <NavLink to="/groups" activeClassName={st.active}>Groups</NavLink>
            </div>
            <div className={st.item}>
                <NavLink to="/music" activeClassName={st.active}>Music</NavLink>
            </div>
            <br/>
            <div className={st.item}>
                <NavLink to="/settings" activeClassName={st.active}>Settings</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;
