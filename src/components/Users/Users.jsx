import UserItem from "./UserItem/UserItem";
import st from "./Users.module.css";
import React from "react";
import Paginator from "../common/Paginator/Paginator";

function Users(props) {
    const usersElements = props.users.map(u => <UserItem
        user={u} key={u.id}
        isFollowingInProgress={props.isFollowingInProgress}
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