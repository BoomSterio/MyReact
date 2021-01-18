import st from './Profile.module.css'
import PMedia from './PMedia/PMedia'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import Preloader from '../common/Preloader/Preloader'
import {ProfileType} from '../../types/types'
import React from 'react'
import MyPosts from './MyPosts/MyPosts'

type Props = {
    profile: ProfileType
    isOwner: boolean
    status: string
    followed: boolean
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfileInfo: (profile: ProfileType) => Promise<any>
}

const Profile: React.FC<Props> = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div className={st.grid}>
            <div className={st.personalBlock}>
                <ProfileInfo isOwner={props.isOwner} profile={props.profile} status={props.status}
                             followed={props.followed}
                             updateStatus={props.updateStatus} savePhoto={props.savePhoto}
                             saveProfileInfo={props.saveProfileInfo}/>
                <MyPosts isOwner={props.isOwner}/>
            </div>
            <div className={st.mediaBlock}>
                <PMedia isOwner={props.isOwner}/>
            </div>
        </div>
    )
}

export default Profile
