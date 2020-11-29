import * as axios from "axios";
import {setUserProfile} from "./profile-reducer";
import {authAPI, profileAPI} from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        }

        default:
            return state;
    }
};

export const setAuthUserData = (userId, email, login) => ({type: SET_USER_DATA, data: {userId: userId, email: email, login: login}});

export const setUserAuth = () => {
    return (dispatch) => {
        authAPI.me().then(responce => {
            if(responce.data.resultCode===0) {
                dispatch(setAuthUserData(responce.data.data.id, responce.data.data.email, responce.data.data.login))
                profileAPI.getProfile(responce.data.data.id).then(responce => {
                    setUserProfile(responce.data);
                });
            }
        });
    }
}

export default authReducer;