import Login from "./Login";
import React from "react";
import {login} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";

const LoginContainer: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
    if (!props.isAuth) {
        return (
            <Login {...props}/>
        );
    } else {
        return <Redirect to="/profile"/>
    }
}

type MapStateToPropsType = {
    captchaUrl: string | null
    isAuth: boolean
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

export default connect(mapStateToProps, {login})(LoginContainer);