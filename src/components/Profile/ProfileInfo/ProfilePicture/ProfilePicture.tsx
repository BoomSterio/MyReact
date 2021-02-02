import st from './ProfilePicture.module.css'
import userPfp from '../../../../assets/images/user.jpg'
import download from '../../../../assets/images/download.png'
import React, {ChangeEvent} from 'react'

type Props = {
    isOwner: boolean
    photo: string | null
    onProfilePhotoSelected: (e: ChangeEvent<HTMLInputElement>) => void
}

const ProfilePicture: React.FC<Props> = ({photo = null, isOwner, onProfilePhotoSelected}) => {
    return (
        <>
            {isOwner ?
                <div>
                    {/*todo: make new component ProfileImage */}
                    <input type={'file'} name={'file'} id={'file'} className={st.inputFile}
                           onChange={onProfilePhotoSelected}/>
                    <label htmlFor={'file'} className={st.inputFileLabel}>
                        <img src={(photo == null) ? userPfp : photo}
                             alt="pfp"
                        />
                    </label>
                    <div className={st.photoLoader}>
                        <input type={'file'} name={'file'} id={'file'} className={st.inputFile}
                               onChange={onProfilePhotoSelected}/>
                        <label htmlFor={'file'} className={st.inputFileButton}><img src={download}
                                                                                    alt={'downl'}/></label>
                    </div>
                </div>
                :
                <div style={{padding: '0.1vw'}}>
                    <img src={(photo == null) ? userPfp : photo}
                         alt="pfp"/>
                </div>
            }
        </>
    )
}

export default ProfilePicture
