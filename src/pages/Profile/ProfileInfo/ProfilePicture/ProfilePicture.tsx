import st from './ProfilePicture.module.css'
import userPfp from '../../../../assets/images/user.jpg'
import download from '../../../../assets/images/download.png'
import React, { ChangeEvent, useState } from 'react'
import { CloseOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Image } from 'antd'

type Props = {
  isOwner: boolean
  photo: string | null
  onProfilePhotoSelected: (e: ChangeEvent<HTMLInputElement>) => void
}

const ProfilePicture: React.FC<Props> = ({ photo = null, isOwner, onProfilePhotoSelected }) => {
  /*const [showPreview, setShowPreview] = useState(false)

    const openPicturePreview = () => {
        !showPreview && setShowPreview(true)
    }

    const closePicturePreview = () => {
        showPreview && setShowPreview(false)
    }*/

  const openPhotoInput = () => {
    // @ts-ignore
    document.getElementById('file').click()
  }

  return (
    <>
      <div className={st.pfp}>
        <Image preview={{ mask: '' }} src={photo == null ? userPfp : photo} alt="pfp" />
      </div>
      {isOwner && (
        <>
          <input type={'file'} name={'file'} id={'file'} className={st.inputFile} onChange={onProfilePhotoSelected} />
          <div className={st.photoLoader}>
            <UploadOutlined onClick={openPhotoInput} className={st.inputFileButton} />
          </div>
        </>
      )}
      {/*{showPreview &&
            <div className={st.pfpPreview}>
                <img onClick={closePicturePreview} src={(photo == null) ? userPfp : photo} alt="pfp"/>
                <CloseOutlined className={st.close} onClick={closePicturePreview}/>
            </div>}*/}
    </>
  )
}

export default ProfilePicture
