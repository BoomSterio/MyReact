import React from 'react'
import st from './Messages.module.css'
import Message from './MessageItem/Message'
import MessageForm from './MessageForm/MessageForm'
import { actions, MessageType } from '../../../redux/dialogs-reducer'
import { useDispatch } from 'react-redux'
import { reset } from 'redux-form'

type Props = {
  messages: Array<MessageType>
}

export type MessageFormValuesType = {
  messageBody: string
}

const Messages: React.FC<Props> = props => {
  const dispatch = useDispatch()

  let messagesElements = props.messages.map(m => <Message message={m.text} type={m.type} key={m.id} id={m.id} />)

  function onSendMessage(values: MessageFormValuesType) {
    dispatch(actions.sendMessage(values.messageBody))
    dispatch(reset('messageForm'))
  }

  return (
    <div className={st.chat}>
      <div className={st.messages}>{messagesElements}</div>
      <div>
        <MessageForm onSubmit={onSendMessage} />
      </div>
    </div>
  )
}

export default Messages
