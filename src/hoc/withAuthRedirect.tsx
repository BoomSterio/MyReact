import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

let mapStateToPropsForRedirect = (state: AppStateType) => ({ isAuth: state.auth.isAuth} as MapPropsType);
type MapPropsType = {
    isAuth: boolean
}
type MapDispatchType = {}

export function withAuthRedirect<WCP> (Component: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC<MapPropsType & MapDispatchType> = (props) => {
        let {isAuth, ...restProps} = props;

        if (!isAuth) return <Redirect to={"/login"}/>

        return <Component {...restProps as WCP}/>
    }

    let ConnectedAuthRedirectComponent = connect<MapPropsType, MapDispatchType, WCP, AppStateType>(mapStateToPropsForRedirect, {}) (RedirectComponent);

    return ConnectedAuthRedirectComponent;
}