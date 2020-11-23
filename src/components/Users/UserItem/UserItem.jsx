import st from "./UserItem.module.css";
import userPfp from "../../../assets/images/user.jpg"
/*import getRandomImage from "../../../assets/images/getRandomImage";*/

function UserItem(props) {
    return (
        <div className={st.user} key={props.id}>
            <div className={st.avatar}>
                <div><img className={st.img} src={(props.img==null) ? userPfp : props.img} alt="userPfp"/> </div>
                <div className={st.followBtn}> { props.followed
                    ? <button onClick={() => {props.unfollow(props.id)}}>Follow</button>
                    : <button onClick={() => {props.follow(props.id)}}>Unfollow</button>} </div>
            </div>
            <div className={st.info}>
                <div>{props.fullName}</div>
                <div>{props.status}</div>
            </div>
            <div className={st.location}>
                <div>{"props.location.country"}</div>
                <div>{"props.location.city"}</div>
            </div>
        </div>

    );
}

export default UserItem;