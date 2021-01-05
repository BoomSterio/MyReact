import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "auth/GET_CAPTCHA_URL_SUCCESS";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}
export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
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

type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
});

type GetCaptchaUrlSuccess = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    captchaUrl: string
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccess => ({type: GET_CAPTCHA_URL_SUCCESS, captchaUrl});

//thunk
export const setUserAuth = () => async (dispatch: any) => {
    let responce = await authAPI.me();

    if (responce.data.resultCode === 0) {
        let {id, email, login} = responce.data.data;
        dispatch(setAuthUserData(id, email, login, true))
        /*profileAPI.getProfile(responce.data.data.id).then(responce => {
            setUserProfile(responce.data);
        });*/
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
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

export const logout = () => async (dispatch: any) => {
    let responce = await authAPI.logoutUser();

    if (responce.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    let responce = await securityAPI.getCaptchaUrl();
    let captchaUrl = responce.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export default authReducer;