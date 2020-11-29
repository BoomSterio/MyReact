import st from "./UserItem.module.css";
import userPfp from "../../../assets/images/user.jpg"
import {NavLink} from "react-router-dom";

function UserItem(props) {
    return (
        <div className={st.user} key={props.id}>
            <div className={st.avatar}>
                <div>
                    <NavLink to={"/profile/" + props.id}>
                        <img className={st.img} src={(props.img == null) ? userPfp : props.img} alt="userPfp"/>
                    </NavLink>
                </div>
                <div> {props.followed
                    ? <button className={st.unfollowBtn}
                              disabled={props.isFollowingInProgress.some(id => id === props.id)}
                              onClick={() => {
                                  props.unfollow(props.id)
                              }}>Unfollow</button>
                    :
                    <button className={st.followBtn} disabled={props.isFollowingInProgress.some(id => id === props.id)}
                            onClick={() => {
                                props.follow(props.id)
                            }}>Follow</button>} </div>
            </div>
            <div className={st.info}>
                <NavLink to={"/profile/" + props.id}>
                    <div className={st.fullName}>{props.fullName}</div>
                </NavLink>
                <div className={st.status}>{props.status}</div>
            </div>
            <div className={st.location}>
                <div>{"props.location.country"}</div>
                <div>{"props.location.city"}</div>
            </div>
        </div>

    );
}

export default UserItem;