import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

class HeaderContainer extends React.Component<MapStateType & MapDispatchType> {
    render () {
        return <Header {...this.props}/>
    }
}

type MapStateType = {
    isAuth: boolean
    login: string | null
}

type MapDispatchType = {
    logout: () => void
}

let mapStateToProps = (state: AppStateType) => ({ isAuth: state.auth.isAuth, login: state.auth.login} as MapStateType)

export default connect(mapStateToProps, {logout}as MapDispatchType)(HeaderContainer);
