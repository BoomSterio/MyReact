import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {setAuthUserData, setUserAuth} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.setUserAuth();
    }

    render () {
        return <Header {...this.props}/>
    }
}

let mapStateToProps = (state) => ({ isAuth: state.auth.isAuth, login: state.auth.login})

export default connect(mapStateToProps, {setAuthUserData, setUserAuth})(HeaderContainer);
