import st from "./UserItem.module.css";
import userPfp from "../../../assets/images/user.jpg"
import {NavLink} from "react-router-dom";

function UserItem({user, follow, unfollow, isFollowingInProgress}) {
    return (
        <div className={st.user} key={user.id}>
            <div className={st.avatar}>
                <div>
                    <NavLink to={"/profile/" + user.id}>
                        <img className={st.img} src={(user.photos.small == null) ? userPfp : user.photos.small} alt="userPfp"/>
                    </NavLink>
                </div>
                <div> {user.followed
                    ? <button className={st.unfollowBtn}
                              disabled={isFollowingInProgress.some(id => id === user.id)}
                              onClick={() => {
                                  unfollow(user.id)
                              }}>Unfollow</button>
                    :
                    <button className={st.followBtn} disabled={isFollowingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                follow(user.id)
                            }}>Follow</button>} </div>
            </div>
            <div className={st.info}>
                <NavLink to={"/profile/" + user.id}>
                    <div className={st.fullName}>{user.name}</div>
                </NavLink>
                <div className={st.status}>{user.status}</div>
            </div>
            <div className={st.location}>
                <div>{"user.location.country"}</div>
                <div>{"user.location.city"}</div>
            </div>
        </div>

    );
}

export default UserItem;