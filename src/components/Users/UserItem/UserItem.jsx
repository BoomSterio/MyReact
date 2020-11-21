import st from "./UserItem.module.css";

function UserItem(props) {
    return (
        <div className={st.user} key={props.id}>
            <div className={st.avatar}>
                <div><img className={st.img} src={props.img} alt="userPfp"/> </div>
                <div className={st.followBtn}> { props.followed
                    ? <button onClick={() => {props.unfollow(props.id)}}>Follow</button>
                    : <button onClick={() => {props.follow(props.id)}}>Unfollow</button>} </div>
            </div>
            <div className={st.info}>
                <div>{props.fullName}</div>
                <div>{props.status}</div>
            </div>
            <div className={st.location}>
                <div>{props.location.country}</div>
                <div>{props.location.city}</div>
            </div>
        </div>
    );
}

export default UserItem;