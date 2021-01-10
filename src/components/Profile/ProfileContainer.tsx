import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfileInfo, updateStatus} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";

type MapStatePropsType = {
    profile: ProfileType
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfileInfo: (profile: ProfileType) => Promise<any>
}

type StateAndDispatch = MapStatePropsType & MapDispatchPropsType

type PathParamsType = {
    userId: string
}

type Props = StateAndDispatch & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<Props> {
    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;

        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                //todo: replace push with Redirect
                this.props.history.push("/login");
            }
        }

        if (!userId) {
            console.error("User id should exist in state or URL params. UserId not found")
        } else {
            this.props.getUserProfile(userId)
            this.props.getStatus(userId)
        }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: Props, prevState: Props) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile {...this.props} isOwner={!this.props.match.params.userId} profile={this.props.profile}
                     status={this.props.status} updateStatus={this.props.updateStatus} savePhoto={this.props.savePhoto}/>
        );
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});

export default compose<React.ComponentType>(
    //withAuthRedirect,
    withRouter,
    connect(mapStateToProps, {/*setUserProfile,*/ getUserProfile, getStatus, updateStatus, savePhoto, saveProfileInfo}),
)(ProfileContainer);

