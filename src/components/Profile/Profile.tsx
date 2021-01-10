import st from './Profile.module.css';
import PMedia from "./PMedia/PMedia";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../common/Preloader/Preloader";
import {ProfileType} from "../../types/types";
import React from "react";

type Props = {
    profile: ProfileType
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfileInfo: (profile: ProfileType) => Promise<any>
}

const Profile: React.FC<Props> = (props) => {
    if (!props.profile) {
        return <Preloader/>
    } else {
        return (
            <div className={st.grid}>
                <div className={st.personalBlock}>
                    <ProfileInfo isOwner={props.isOwner} profile={props.profile} status={props.status}
                                 updateStatus={props.updateStatus} savePhoto={props.savePhoto}
                                 saveProfileInfo={props.saveProfileInfo}/>
                    <MyPostsContainer/>
                </div>
                <div className={st.mediaBlock}>
                    <PMedia/>
                </div>
            </div>
        );
    }
}

export default Profile;
