import st from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={st.nav}>
      <div className={st.item}>
        <a>Profile</a>
      </div >
      <div className={st.item}>
        <a>Messages</a>
      </div>
      <div className={st.item}>
        <a>Feed</a>
      </div>
      <div className={st.item}>
        <a>Music</a>
      </div>
      <div className={st.item}>
        <a>Settings</a>
      </div>
    </nav>
  );
}

export default Navbar;
