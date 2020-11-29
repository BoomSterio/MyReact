import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {profileAPI} from "../../api/api";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId)
            userId = 12834;

        profileAPI.getProfile(userId).then(responce => {
            this.props.setUserProfile(responce.data);
        });
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} />
        );
    }
}

let mapStateToProps = (state) => ({profile: state.profilePage.profile});

export default compose(
    //withAuthRedirect,
    withRouter,
    connect(mapStateToProps, {setUserProfile}),
)(ProfileContainer);

