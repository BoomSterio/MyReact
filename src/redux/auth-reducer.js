import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "auth/SET_USER_DATA";

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
                ...action.payload,
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

export const login = (email, password, rememberMe) => async (dispatch) => {
    let responce = await authAPI.loginUser(email, password, rememberMe);

    if (responce.data.resultCode === 0) {
        dispatch(setUserAuth());
    } else {
        let message = responce.data.messages.length >= 0 ? responce.data.messages[0] : "Some error"
        let action = stopSubmit("login", {_error: message});
        dispatch(action)
    }
}

export const logout = () => async (dispatch) => {
    let responce = await authAPI.logoutUser();

    if (responce.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer;