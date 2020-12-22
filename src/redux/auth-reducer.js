import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "auth/GET_CAPTCHA_URL_SUCCESS";

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload,
            }
        }
        case GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        }

        default:
            return state;
    }
};

export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
});

export const getCaptchaUrlSuccess = (captchaUrl) => ({type: GET_CAPTCHA_URL_SUCCESS, captchaUrl});

//thunk
export const setUserAuth = () => async (dispatch) => {
    let responce = await authAPI.me();

    if (responce.data.resultCode === 0) {
        let {id, email, login} = responce.data.data;
        dispatch(setAuthUserData(id, email, login, true))
        /*profileAPI.getProfile(responce.data.data.id).then(responce => {
            setUserProfile(responce.data);
        });*/
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let responce = await authAPI.loginUser(email, password, rememberMe, captcha);

    if (responce.data.resultCode === 0) {
        dispatch(setUserAuth());
    } else {
        if (responce.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        let message = responce.data.messages.length >= 0 ? responce.data.messages[0] : "Unknown error"
        let action = stopSubmit("login", {_error: message});
        dispatch(action);
    }
}

export const logout = () => async (dispatch) => {
    let responce = await authAPI.logoutUser();

    if (responce.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    let responce = await securityAPI.getCaptchaUrl();
    let captchaUrl = responce.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export default authReducer;