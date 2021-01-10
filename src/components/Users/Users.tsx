import UserItem from "./UserItem/UserItem";
import st from "./Users.module.css";
import React, {FC} from "react";
import Paginator from "../common/Paginator/Paginator";
import {UserType} from "../../types/types";

type Props = {
    users: Array<UserType>
    followingInProgress: Array<number>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    onPageSelector: (pageNumber: number) => void
}

const Users: FC<Props> = (props) => {
    const usersElements = props.users.map(u => <UserItem
        user={u} key={u.id}
        followingInProgress={props.followingInProgress}
        follow={props.follow} unfollow={props.unfollow}/>);
    return (
        <div className={st.usersPage}>
            <div className={st.filters}>
                <span className={st.usersSwitch}>Friends</span>
                <span className={st.usersSwitch}>Requests</span>
                <span className={st.usersSwitch}>All users</span>
                <span className={st.usersSearch}><input/></span>
                <span><button onClick={() => {
                }}>Find</button></span>
            </div>
            <Paginator totalItemsCount={props.totalUsersCount} pageSize={props.pageSize} currentPage={props.currentPage}
                       onPageSelector={props.onPageSelector}/>
            <div className={st.usersItems}>
                {usersElements}
            </div>
        </div>
    );
}

export default Users;