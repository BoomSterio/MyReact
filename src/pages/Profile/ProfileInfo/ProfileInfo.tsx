import st from './ProfileInfo.module.css'
import userPfp from '../../../assets/images/user.jpg'
import sunrise from '../../../assets/images/sunrise.png'
import download from '../../../assets/images/download.png'
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks'
import Preloader from '../../../components/common/Preloader/Preloader'
import React, { ChangeEvent, useState } from 'react'
import ProfileAboutForm from './ProfileAboutForm/ProfileAboutForm'
import ProfileAbout from './ProfileAbout/ProfileAbout'
import { ProfileType } from '../../../types/types'
import { useDispatch, useSelector } from 'react-redux'
import { follow, unfollow } from '../../../redux/profile-reducer'
import { AppStateType } from '../../../redux/redux-store'
import FollowingButton from '../../../components/common/FollowingButton/FollowingButton'
import ProfilePicture from './ProfilePicture/ProfilePicture'

type Props = {
  profile: ProfileType
  isOwner: boolean
  status: string
  followed: boolean
  updateStatus: (status: string) => void
  savePhoto: (file: File) => void
  saveProfileInfo: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<Props> = props => {
  let [editMode, setEditMode] = useState(false)

  const isFollowingInProgress = useSelector((state: AppStateType) => state.profilePage.isFollowingInProgress)

  const dispatch = useDispatch()

  const followUser = (userId: number) => {
    dispatch(follow(userId))
  }

  const unfollowUser = (userId: number) => {
    dispatch(unfollow(userId))
  }

  if (!props.profile) {
    return <Preloader />
  }

  const onSubmit = (formData: ProfileType) => {
    // todo: remove .then
    props.saveProfileInfo(formData).then(() => {
      setEditMode(false)
    })
  }

  const onProfilePhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      props.savePhoto(e.target.files[0])
    }
  }

  return (
    <div className={st.profileInfo}>
      <div className={st.banner}>
        <img src={'https://picsum.photos/3840/2160'} alt="pfBanner" />
      </div>
      <div className={props.isOwner ? st.myPfp : st.pfp}>
        <ProfilePicture isOwner={props.isOwner} photo={props.profile.photos.large} onProfilePhotoSelected={onProfilePhotoSelected} />
      </div>
      {editMode ? (
        <ProfileAboutForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} />
      ) : (
        <>
          <div className={props.isOwner ? st.myInfo : st.info}>
            <div className={'name'}>{props.profile.fullName}</div>
            <ProfileStatusWithHooks isOwner={props.isOwner} status={props.status} updateStatus={props.updateStatus} />
            {!props.isOwner && (
              <div>
                <FollowingButton
                  followed={props.followed}
                  isFollowingInProgress={isFollowingInProgress}
                  id={props.profile.userId}
                  handleFollow={followUser}
                  handleUnfollow={unfollowUser}
                />
              </div>
            )}
          </div>
          <ProfileAbout
            profile={props.profile}
            isOwner={props.isOwner}
            goToEditMode={() => {
              setEditMode(true)
            }}
          />
        </>
      )}
    </div>
  )
}

export default ProfileInfo
