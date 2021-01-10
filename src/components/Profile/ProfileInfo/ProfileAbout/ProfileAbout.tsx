import st from "./ProfileAbout.module.css";
import settings from "../../../../assets/images/settings.png";
import IconLink from "../../../common/IconLink/IconLink";
import {ContactsType, ProfileType} from "../../../../types/types";
import React from "react";

type Props = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileAbout: React.FC<Props> = (props) => {
    const contacts = props.profile.contacts;
    const contactsIcons = Object.keys(contacts).map((site, i) => <IconLink type={site}
                                                                           link={contacts[site as keyof ContactsType]}/>)

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

export default ProfileAbout;