import st from './ProfileAbout.module.css'
import IconLink from '../../../../components/common/IconLink/IconLink'
import {ContactsType, ProfileType} from '../../../../types/types'
import React from 'react'

type Props = {
  profile: ProfileType
  isOwner: boolean
  goToEditMode: () => void
}

const ProfileAbout: React.FC<Props> = props => {
  const contacts = props.profile.contacts
  const contactsIcons = Object.keys(contacts).map((site, i) => <IconLink key={i} type={site} link={contacts[site as keyof ContactsType]} />)

  return (
    <div className={st.infoAbout}>
      <div>
        <div onDoubleClick={props.isOwner ? props.goToEditMode : () => {}}>
          {props.profile.aboutMe && (
            <div>
              <b>About me: </b>
              {props.profile.aboutMe}
            </div>
          )}
          <div>
            <b>Looking for a job: </b>
            {props.profile.lookingForAJob ? 'Yes' : 'No'}
          </div>
          {props.profile.lookingForAJob && (
            <div>
              <b>Skills: </b>
              {props.profile.lookingForAJobDescription}
            </div>
          )}
        </div>
        <div className={st.linkIcons}>
          {contactsIcons}
          {props.isOwner && (
            <div className={st.settingsBtn} onClick={props.goToEditMode}>
              Edit Profile...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileAbout
