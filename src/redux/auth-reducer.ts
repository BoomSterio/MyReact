import {ResultCodesEnum, ResultCodeWithCaptchaEnum} from '../api/api'
import {BaseThunkType, InferActionsTypes} from './redux-store'
import {authAPI} from '../api/auth-api'
import {securityAPI} from '../api/security-api'

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
    error: null as string | null
}
export type InitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'auth/SET_USER_DATA': {
            return {
                ...state,
                ...action.payload,
            }
        }
        case 'auth/GET_CAPTCHA_URL_SUCCESS': {
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        }
        case 'auth/SET_ERROR': {
            return {
                ...state,
                error: action.message
            }
        }

        default:
            return state;
    }
};

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'auth/SET_USER_DATA',
        payload: {userId, email, login, isAuth}
    }as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({type: 'auth/GET_CAPTCHA_URL_SUCCESS', captchaUrl}as const),
    setError: (message: string) => ({type: 'auth/SET_ERROR', message} as const)
}

//thunk creators
type ThunkType = BaseThunkType<ActionsTypes>

export const setUserAuth = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.me();

    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = meData.data;
        dispatch(actions.setAuthUserData(id, email, login, true))
        /*profileAPI.getProfile(responce.data.data.id).then(responce => {  //for redux-form
            setUserProfile(responce.data);
        });*/
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null ): ThunkType => async (dispatch: any) => {
    let data = await authAPI.loginUser(email, password, rememberMe, captcha);

    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(setUserAuth());
    } else {
        if (data.resultCode === ResultCodeWithCaptchaEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        }
        let message = data.messages.length >= 0 ? data.messages[0] : "Unknown error"
        /*let action = stopSubmit("login", {_error: message});
        dispatch(action);*/
        dispatch(actions.setError(message))
    }
}

export const logout = (): ThunkType => async (dispatch) => {
    let data = await authAPI.logoutUser();

    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let responce = await securityAPI.getCaptchaUrl();
    let captchaUrl = responce.data.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
}

export default authReducer;