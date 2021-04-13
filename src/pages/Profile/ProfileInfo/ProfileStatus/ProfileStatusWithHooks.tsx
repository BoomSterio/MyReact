import React, { ChangeEvent, useEffect, useState } from 'react'
import st from './ProfileStatus.module.css'
import { Input } from 'antd'

type Props = {
  status: string
  isOwner: boolean
  updateStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<Props> = props => {
  let [editMode, setEditMode] = useState(false)
  let [status, setStatus] = useState(props.status)

  useEffect(() => {
    setStatus(props.status)
  }, [props.status]) //function will be executed when props.status is changed

  const activateEditMode = () => {
    if (props.isOwner) {
      setEditMode(true)
    }
  }

  const deactivateEditMode = () => {
    setEditMode(false)
    props.updateStatus(status)
  }

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value)
  }

  return (
    <div>
      {editMode ? (
        <div>
          <Input className={st.statusInput} onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus={true} value={status} />
        </div>
      ) : (
        <div>
          <label className={props.isOwner ? st.status : ''} onDoubleClick={activateEditMode}>
            {props.status || 'Member of meow community!'}
          </label>
        </div>
      )}
    </div>
  )
}

export default ProfileStatusWithHooks
