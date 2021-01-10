import {updateObjectInArray} from "../utils/objects-helpers"
import {UserType} from "../types/types";
import { Dispatch } from "redux";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./redux-store";
import {usersAPI} from "../api/users-api";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10 ,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> //array of users id
}

export type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'usersPage/FOLLOW': {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed:true})
            }
        }
        case 'usersPage/UNFOLLOW': {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed:false})
            }
        }
        case 'usersPage/SET_USERS': {
            return {...state, users: [...action.users]}
        }
        case 'usersPage/SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'usersPage/SET_TOTAL_USERS_COUNT': {
            return {...state, totalUsersCount: action.totalCount}
        }
        case 'usersPage/TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'usersPage/TOGGLE_FOLLOWING_IN_PROGRESS': {
            return {
                ...state, followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }

        default:
            return state;
    }
};

type ActionsTypes = InferActionsTypes<typeof actions>

//action creators
export const actions = {
    followSuccess: (userId: number) => ({type: 'usersPage/FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'usersPage/UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'usersPage/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'usersPage/SET_CURRENT_PAGE', currentPage} as const),
    setTotalUsersCount: (totalCount: number) => ({type: 'usersPage/SET_TOTAL_USERS_COUNT', totalCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'usersPage/TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingProgress: (followingInProgress: boolean, userId: number) => ({
        type: 'usersPage/TOGGLE_FOLLOWING_IN_PROGRESS',
        followingInProgress,
        userId
    } as const),
}

//thunk creators
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = BaseThunkType<ActionsTypes>

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch: DispatchType, getState: () => AppStateType) => {
        dispatch(actions.toggleIsFetching(true));

        let data = await usersAPI.getUsers(page, pageSize)

        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    }
}

const _toggleFollowingFlow = async (dispatch: DispatchType, userId: number, apiMethod: any,
                                    actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId);

    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _toggleFollowingFlow(dispatch, userId, usersAPI.postFollow.bind(usersAPI), actions.followSuccess)
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _toggleFollowingFlow(dispatch, userId, usersAPI.deleteFollow.bind(usersAPI), actions.unfollowSuccess)
    }
}

export default usersReducer;