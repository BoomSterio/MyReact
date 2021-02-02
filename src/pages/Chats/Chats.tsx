import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {Avatar, Button, Col, Row} from 'antd'
import TextArea from 'antd/es/input/TextArea'
import {ChatMessageType} from '../../types/types'
import {useDispatch, useSelector} from 'react-redux'
import {sendMessage, startMessagesListening, stopMessagesListening} from '../../redux/chat-reducer'
import {AppStateType} from '../../redux/redux-store'

const Chats: React.FC = () => {
    return (
        <div>
            <ul>
                <li>Chat1</li>
                <li>Chat2</li>
            </ul>
            <Chat/>
        </div>
    )
}

const Chat: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

return (
    <div>
        <Messages />
        <MessageForm />
    </div>
)
}

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)

    return (
        <div style={{height: '27.5vw', overflowY: 'auto'}}>
            {messages.map((m, i) => <Message message={m} key={i}/>)}
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {
    return (
        <div>
            <Link to={`/profile/${message.userId}`}><Avatar src={message.photo} alt={'ava'}/></Link>
            <b>{message.userName}</b>
            <div>{message.message}</div>
        </div>
    )
}

const MessageForm: React.FC = () => {
    const [message, setMessage] = useState<string>('')

    const dispatch = useDispatch()

    const sendMessageHandler = () => {
        if (!message)
            return

        dispatch(sendMessage(message))

        setMessage('')
    }

    return (
        <div>
            <Row>
                <Col span={20}>
                    <TextArea value={message} onChange={(e) => {
                        setMessage(e.target.value)
                    }}/>
                </Col>
                <Col span={4}>
                    <Button loading={false} onClick={sendMessageHandler}>
                        Send
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default Chats