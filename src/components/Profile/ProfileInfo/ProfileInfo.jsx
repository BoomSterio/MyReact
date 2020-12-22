import st from './ProfileInfo.module.css';
import userPfp from "../../../assets/images/user.jpg";
import sunrise from "../../../assets/images/sunrise.png";
import download from "../../../assets/images/download.png";
import settings from "../../../assets/images/settings.png";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import Preloader from "../../common/Preloader/Preloader";
import IconLink from "../../common/IconLink/IconLink";
import {useState} from "react";
import ProfileAboutForm from "./ProfileAboutForm/ProfileAboutForm";

const ProfileInfo = (props) => {
    let [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader/>;
    }

    const ProfileAbout = (props) => {
        return (
            <div className={st.infoAbout}>
                <div>
                    {props.profile.aboutMe &&
                    <div>
                        <b>About me: </b>{props.profile.aboutMe}
                    </div>}
                    <div>
                        <b>Looking for a job: </b>{props.profile.lookingForAJob ? "Yes" : "No"}
                    </div>
                    {props.profile.lookingForAJob &&
                    <div>
                        <b>Skills: </b>{props.profile.lookingForAJobDescription}
                    </div>}
                    <div>
                        {contactsIcons}
                    </div>
                    {props.isOwner &&
                    <div>
                        <label className={st.settingsBtn} onClick={props.goToEditMode}><img src={settings}
                                                                                            alt={"editModeBtn"}/></label>
                    </div>}
                </div>
            </div>
        )
    }

    const onSubmit = (formData) => {
        props.saveProfileInfo(formData).then(() => {
            setEditMode(false);
        });
    }

    const onProfilePhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }

    const contacts = props.profile.contacts;
    const contactsIcons = Object.keys(contacts).map((site, i) => <IconLink type={site}
                                                                           link={contacts[site]}/>)
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
                        <input type={"file"} name={"file"} id={"file"} className={st.inputFile}
                               onChange={onProfilePhotoSelected}/>
                        <label for={"file"} className={st.inputFileLabel}>
                            <img src={(props.profile.photos.large == null) ? userPfp : props.profile.photos.large}
                                 alt="pfp"
                            />
                        </label>
                        <div className={st.photoLoader}>
                            <input type={"file"} name={"file"} id={"file"} className={st.inputFile}
                                   onChange={onProfilePhotoSelected}/>
                            <label for={"file"} className={st.inputFileButton}><img src={download}
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