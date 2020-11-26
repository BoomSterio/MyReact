import UserItem from "./UserItem/UserItem";
import st from "./Users.module.css";
import React from "react";
import classNames from "classnames";

function Users (props) {
   function  getUsersElements() {
        return props.users.map(u => <UserItem
            id={u.id} key={u.id} img={u.photos.small} fullName={u.name} location={u.location} status={u.status}
            followed={u.followed}
            follow={props.follow} unfollow={props.unfollow}/>);
    }

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const setPaginationBtnClasses = (p, firstButton, lastButton) => {
        return classNames({
            [st.selectedPage]: now === p,
            [st.unselectedPage]: firstButton,
            [st.unselectedPage]: lastButton
        })
    };

    let now = props.currentPage;

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
            <div className={st.pageSelector}>
                {pages.map(p => {
                    if ((p < now + 3 && p > now - 3) ||
                        p === 1 || p === pages.length
                    ) {
                        return <div key={p}
                                    className={setPaginationBtnClasses(p, now > p + 3, p === pages.length && (now < p - 4) )}
                                    onClick={() => { props.onPageSelector(p) }}
                        >{p}</div>
                    } else return ""
                    /*return <div
                        className={props.currentPage === p ? st.selectedPage : st.unselectedPage}
                        onClick={() => {
                            onPageSelector(p)
                        }}>{p}</div>*/
                })}
            </div>
            <div className={st.usersItems}>
                {getUsersElements()}
            </div>
        </div>
    );
}

export default Users;