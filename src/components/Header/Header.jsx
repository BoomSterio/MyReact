import logo from "../../assets/images/logoBID3s.png";
import st from './Header.module.css';

function Header() {
  return (
    <header className={st.header}>
      <img src={logo} alt="logo" />
      No hooman zone
    </header>
  );
}

export default Header;
