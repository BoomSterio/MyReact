import st from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Messages from './Messages/Messages'
import React from 'react'
import { AppStateType } from '../../redux/redux-store'
import { useSelector } from 'react-redux'

type Props = {}

const Dialogs: React.FC<Props> = props => {
  const state = useSelector((state: AppStateType) => state.dialogsPage)

  const dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} img={d.img} key={d.id} id={d.id} />)

  return (
    <div className={st.dialogs}>
      <div className={st.dialogsItems}>{dialogsElements}</div>
      <div className={st.messages}>
        <Messages messages={state.messages} />
      </div>
    </div>
  )
}

export default Dialogs
