import logo from "../../img/logoBID3s.png";
import st from './Header.module.css';

function Header() {
  return (
    <header className={st.header}>
      <img src={logo} alt="logo" />
    </header>
  );
}

export default Header;
