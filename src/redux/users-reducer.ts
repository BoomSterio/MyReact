import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objects-helpers"
import {UserType} from "../types/types";

const FOLLOW = "usersPage/FOLLOW";
const UNFOLLOW = "usersPage/UNFOLLOW";
const SET_USERS = "usersPage/SET_USERS";
const SET_CURRENT_PAGE = "usersPage/SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "usersPage/SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "usersPage/TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOWING_IN_PROGRESS = "usersPage/TOGGLE_FOLLOWING_IN_PROGRESS";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10 ,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    isFollowingInProgress: [] as Array<number> //array of users id
}

export type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed:true})
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed:false})
            }
        }
        case SET_USERS: {
            return {...state, users: [...action.users]}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_FOLLOWING_IN_PROGRESS: {
            return {
                ...state, isFollowingInProgress: action.isFollowingInProgress
                    ? [...state.isFollowingInProgress, action.userId]
                    : state.isFollowingInProgress.filter(id => id !== action.userId)
            }
        }

        default:
            return state;
    }
};

//action creators
type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => ({type: FOLLOW, userId});
type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({type: UNFOLLOW, userId});
type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users});
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage});
type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalCount: number
}
export const setTotalUsersCount = (totalCount: number): SetTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, totalCount});
type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching});
type ToggleFollowingProgress = {
    type: typeof TOGGLE_FOLLOWING_IN_PROGRESS
    isFollowingInProgress: boolean
    userId: number
}
export const toggleFollowingProgress = (isFollowingInProgress: boolean, userId: number): ToggleFollowingProgress => ({
    type: TOGGLE_FOLLOWING_IN_PROGRESS,
    isFollowingInProgress,
    userId
})

export const requestUsers = (page: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(toggleIsFetching(true));

        let data = await usersAPI.getUsers(page, pageSize)

        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

const toggleFollowingFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingProgress(true, userId));
    let responce = await apiMethod(userId);

    if (responce.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId: number) => {
    return async (dispatch: any) => {
        toggleFollowingFlow(dispatch, userId, usersAPI.postFollow.bind(usersAPI), followSuccess)
    }
}

export const unfollow = (userId: number) => {
    return async (dispatch: any) => {
        toggleFollowingFlow(dispatch, userId, usersAPI.deleteFollow.bind(usersAPI), unfollowSuccess)
    }
}

export default usersReducer;