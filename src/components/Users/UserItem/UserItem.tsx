import st from "./UserItem.module.css";
import userPfp from "../../../assets/images/user.jpg"
import {NavLink} from "react-router-dom";
import {UserType} from "../../../types/types";
import React from "react";

type Props = {
    user: UserType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: Array<number>
}

const UserItem: React.FC<Props> = ({user, follow, unfollow, followingInProgress}) => {
    return (
        <div className={st.user} key={user.id}>
            <div className={st.avatar}>
                <div>
                    <NavLink to={"/profile/" + user.id}>
                        <img className={st.img} src={(user.photos.small == null) ? userPfp : user.photos.small}
                             alt="userPfp"/>
                    </NavLink>
                </div>
                <div>
                    <button className={user.followed ? st.unfollowBtn : st.followBtn}
                            disabled={followingInProgress.some((id: number) => id === user.id)}
                            onClick={user.followed ? () => {unfollow(user.id)} : () => {follow(user.id)}}>
                        {user.followed ? "Unfollow" : "Follow"}</button>
                </div>
            </div>
            <div className={st.info}>
                <NavLink to={"/profile/" + user.id}>
                    <div className={st.fullName}>{user.name}</div>
                </NavLink>
                <div className={st.status}>{user.status}</div>
            </div>
            <div className={st.location}>
                {/*todo: for future API updates*/}
                <div>{"user.location.country"}</div>
                <div>{"user.location.city"}</div>
            </div>
        </div>

    );
}

export default UserItem;