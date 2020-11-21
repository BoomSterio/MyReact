import st from './Users.module.css'
import UserItem from "./UserItem/UserItem";

function Users(props) {
    debugger
    let usersElements = props.users.map(u => <UserItem
        id={u.id} key={u.id} img={u.img} fullName={u.fullName} location={u.location} status={u.status} followed={u.followed}
        follow={props.follow} unfollow={props.unfollow}/>);

    return (
        <div className={st.usersPage}>
            <div className={st.filters}>
                <span className={st.usersSwitch}>Friends</span>
                <span className={st.usersSwitch}>Requests</span>
                <span className={st.usersSwitch}>All users</span>
                <span className={st.usersSearch}><input/></span>
                <span><button onClick={() => {}}>Find</button></span>
            </div>
            <div className={st.usersItems}>
                {usersElements}
            </div>
        </div>
    );
}

export default Users;