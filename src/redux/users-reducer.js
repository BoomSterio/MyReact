import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objects-helpers"

const FOLLOW = "usersPage/FOLLOW";
const UNFOLLOW = "usersPage/UNFOLLOW";
const SET_USERS = "usersPage/SET_USERS";
const SET_CURRENT_PAGE = "usersPage/SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "usersPage/SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "usersPage/TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOWING_IN_PROGRESS = "usersPage/TOGGLE_FOLLOWING_IN_PROGRESS";

let initialState = {
    users: [/*{
        id: 1,
        followed: true,
        fullName: "Valery Fikalis",
        status: "I want pizza",
        location: {country: "Niger", city: "Samara"},
        img: "https://cdn.images.express.co.uk/img/dynamic/25/590x/secondary/Google-Maps-Street-View-has-captured-a-close-up-of-a-very-confused-and-very-cute-cat-1423729.jpg?r=1532353596872"
    },
    {
        id: 2,
        followed: false,
        fullName: "Arbuz Baksov",
        status: "Hooman lives matter",
        location: {country: "Russia", city: "Saransk"},
        img: "https://iruntheinternet.com/lulzdump/images/stoned-looking-cat-close-up-picture-13849018563.jpg"
    },
    {
        id: 3,
        followed: false,
        fullName: "Kevin V",
        status: "Looking for a new master",
        location: {country: "Ukraine", city: "Kiev"},
        img: "https://i.pinimg.com/564x/2a/c1/d6/2ac1d69e8948129160842716ba1a8683.jpg"
    },
    {
        id: 4,
        followed: true,
        fullName: "Baks Voloshin",
        status: "Ты быканул или мне показалось?",
        location: {country: "Ukraine", city: "Dnepr"},
        img: "https://lh3.googleusercontent.com/proxy/nAz0VALCyGcxzWiBEr3eDeTA10vu7v1EsF5pkpKJj5gVaJ-wPFtS6-WEdZf934qEP-R7Jpw9q9XI-U486Rb09B9T07qTLMrbdV8qWQl0A49JAgVtEHeSUZa_Q6adw7fb4So807ISnyqdiHW08RRHLw"
    },*/],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    isFollowingInProgress: [2, 3]
}

const usersReducer = (state = initialState, action) => {
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

export const followSuccess = (userId) => ({type: FOLLOW, userId});
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalCount) => ({type: SET_TOTAL_USERS_COUNT, totalCount});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingProgress = (isFollowingInProgress, userId) => ({
    type: TOGGLE_FOLLOWING_IN_PROGRESS,
    isFollowingInProgress,
    userId
})

export const requestUsers = (page, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));

        let data = await usersAPI.getUsers(page, pageSize)

        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

const toggleFollowingFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId));
    let responce = await apiMethod(userId);

    if (responce.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId) => {
    return async (dispatch) => {
        toggleFollowingFlow(dispatch, userId, usersAPI.postFollow.bind(usersAPI), followSuccess)
    }
}

export const unfollow = (userId) => {
    return async (dispatch) => {
        toggleFollowingFlow(dispatch, userId, usersAPI.deleteFollow.bind(usersAPI), unfollowSuccess)
    }
}

export default usersReducer;