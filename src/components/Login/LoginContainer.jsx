import Login from "./Login";
import React from "react";
import {compose} from "redux";
import {login, logout} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

class LoginContainer extends React.Component {
    render() {
        if (!this.props.isAuth) {
            return (
                <Login {...this.props}/>
            );
        }
        else {
            return <Redirect to="/profile" />
        }
    }
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default compose(
    connect(mapStateToProps, {login, logout})
)(LoginContainer);