import React from "react"
import st from './Users.module.css'
import UserItem from "./UserItem/UserItem";
import * as axios from "axios";
import classNames from 'classnames';

class Users extends React.Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(responce => {
            this.props.setUsers(responce.data.items);
            this.props.setTotalUsersCount(responce.data.totalCount);
        });
    }

    getUsersElements() {
        return this.props.users.map(u => <UserItem
            id={u.id} key={u.id} img={u.photos.small} fullName={u.name} location={u.location} status={u.status}
            followed={u.followed}
            follow={this.props.follow} unfollow={this.props.unfollow}/>);
    }

    onPageSelector = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(responce => {
            this.props.setUsers(responce.data.items);
        });
    }

    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

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

        let now = this.props.currentPage;
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
                                         onClick={() => { this.onPageSelector(p) }}
                            >{p}</div>
                        } else return ""
                        /*return <div
                            className={this.props.currentPage === p ? st.selectedPage : st.unselectedPage}
                            onClick={() => {
                                this.onPageSelector(p)
                            }}>{p}</div>*/
                    })}
                </div>
                <div className={st.usersItems}>
                    {this.getUsersElements()}
                </div>
            </div>
        );
    }
}

export default Users;