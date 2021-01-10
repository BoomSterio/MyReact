import {connect} from "react-redux";
import {
    follow,
    unfollow,
    actions,
    requestUsers
} from "../../redux/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getIsFetching,
    getIsFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    users: Array<UserType>
    totalUsersCount: number
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    setCurrentPage: (currentPage: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

type OwnPropsType = {

}

type Props = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<Props> {
    componentDidMount() {
        this.props.setCurrentPage(this.props.currentPage);
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageSelector = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/>
                : <Users onPageSelector={this.onPageSelector}
                         follow={this.props.follow}
                         unfollow={this.props.unfollow}
                         users={this.props.users}
                         totalUsersCount={this.props.totalUsersCount}
                         pageSize={this.props.pageSize}
                         currentPage={this.props.currentPage}
                         followingInProgress={this.props.followingInProgress}
                />
            }
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getIsFollowingInProgress(state)
    }
}

const setCurrentPage = actions.setCurrentPage

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
        mapStateToProps,
        {follow, unfollow, setCurrentPage, getUsers: requestUsers} as MapDispatchPropsType)
)(UsersContainer)
