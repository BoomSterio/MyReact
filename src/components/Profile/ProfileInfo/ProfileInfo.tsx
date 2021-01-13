import st from './ProfileInfo.module.css';
import userPfp from "../../../assets/images/user.jpg";
import sunrise from "../../../assets/images/sunrise.png";
import download from "../../../assets/images/download.png";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import Preloader from "../../common/Preloader/Preloader";
import React, {ChangeEvent, useState} from "react";
import ProfileAboutForm from "./ProfileAboutForm/ProfileAboutForm";
import ProfileAbout from "./ProfileAbout/ProfileAbout";
import {ProfileType} from "../../../types/types";

type Props = {
    profile: ProfileType
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfileInfo: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<Props> = (props) => {
    let [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader/>;
    }

    const onSubmit = (formData: ProfileType) => {
        // todo: remove .then
        props.saveProfileInfo(formData).then(() => {
            setEditMode(false);
        });
    }

    const onProfilePhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            props.savePhoto(e.target.files[0]);
        }
    }

    return (
        <div className={st.profileInfo}>
            <div className={st.banner}>
                <img
                    src={sunrise}
                    alt="pfBanner"
                />
            </div>
            <div className={props.isOwner ? st.myPfp : st.pfp}>
                {props.isOwner ?
                    <div>
                        {/*todo: make new component ProfileImage */}
                        <input type={"file"} name={"file"} id={"file"} className={st.inputFile}
                               onChange={onProfilePhotoSelected}/>
                        <label htmlFor={"file"} className={st.inputFileLabel}>
                            <img src={(props.profile.photos.large == null) ? userPfp : props.profile.photos.large}
                                 alt="pfp"
                            />
                        </label>
                        <div className={st.photoLoader}>
                            <input type={"file"} name={"file"} id={"file"} className={st.inputFile}
                                   onChange={onProfilePhotoSelected}/>
                            <label htmlFor={"file"} className={st.inputFileButton}><img src={download}
                                                                                    alt={"downl"}/></label>
                        </div>
                    </div>
                    :
                    <img src={(props.profile.photos.large == null) ? userPfp : props.profile.photos.large}
                         alt="pfp"/>}
            </div>
            {editMode ?
                <ProfileAboutForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/>
                :
                <div>
                    <div className={props.isOwner ? st.myInfo : st.info}>
                        <div className={st.fullName}>{props.profile.fullName}</div>
                        <ProfileStatusWithHooks isOwner={props.isOwner} status={props.status}
                                                updateStatus={props.updateStatus}/>
                    </div>
                    <ProfileAbout profile={props.profile} isOwner={props.isOwner} goToEditMode={() => {
                        setEditMode(true)
                    }}/>
                </div>
            }
        </div>
    );
}

export default ProfileInfo;