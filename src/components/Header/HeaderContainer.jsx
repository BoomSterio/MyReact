import React from "react";
import Header from "./Header";
import * as axios from "axios";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/auth-reducer";
import {setUserProfile} from "../../redux/profile-reducer";

class HeaderContainer extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true}).then(responce => {
            if(responce.data.resultCode===0) {
                this.props.setAuthUserData(responce.data.data.id, responce.data.data.email, responce.data.data.login)
                axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${responce.data.data.id}`).then(responce => {
                    setUserProfile(responce.data);
                });
            }
        });
    }

    render () {
        return <Header {...this.props}/>
    }
}

let mapStateToProps = (state) => ({ isAuth: state.auth.isAuth, login: state.auth.login})


export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);
