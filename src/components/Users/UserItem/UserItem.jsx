import st from "./UserItem.module.css";
import userPfp from "../../../assets/images/user.jpg"
import {NavLink} from "react-router-dom";
import * as axios from "axios";

function UserItem(props) {
    const followUser = (id) =>{
        axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${id}`, {}, {
            withCredentials: true,
            headers: {"API-KEY": "cbc2c291-81b5-4772-8310-eee4020aaac6"}}).then(responce => {
            if (responce.data.resultCode === 0) {
                props.follow(id);
            }})
    }

    const unfollowUser = (id) => {
        axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${id}`, {withCredentials: true,
            headers: {"API-KEY": "cbc2c291-81b5-4772-8310-eee4020aaac6"}}).then(responce => {
            if(responce.data.resultCode === 0) {
                props.unfollow(id);
            }
        })
    }

        return (
        <div className={st.user} key={props.id}>
            <div className={st.avatar}>
                <div>
                    <NavLink to={"/profile/" + props.id}>
                        <img className={st.img} src={(props.img == null) ? userPfp : props.img} alt="userPfp"/>
                    </NavLink>
                </div>
                <div> {props.followed
                    ? <button className={st.unfollowBtn} onClick={() => {
                        unfollowUser(props.id)
                    }}>Unfollow</button>
                    : <button className={st.followBtn} onClick={() => {
                        followUser(props.id)
                    }}>Follow</button>} </div>
            </div>
            <div className={st.info}>
                <div className={st.fullName}>{props.fullName}</div>
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