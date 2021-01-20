import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {Avatar, Button, Col, Row} from 'antd'
import TextArea from 'antd/es/input/TextArea'
import {TargetElement} from '@testing-library/user-event'

export type ChatMessageType = {
    message: string
    photo: string
    userId: string
    userName: string
}

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
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket
        const closeHandler = () => {
            console.log('chat ws channel close')
            setTimeout(createChannel, 3000)
        }
        const createChannel = () => {
            ws?.removeEventListener('close', closeHandler)
            ws?.close()
            ws = (new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'))
            ws?.addEventListener('close', closeHandler)
            setWsChannel(ws)
        }
        createChannel()

        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])

    return (
        <div>
            <ChatMessages wsChannel={wsChannel}/>
            <ChatMessageForm wsChannel={wsChannel}/>
        </div>
    )
}

const ChatMessages: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [messages, setMessages] = useState<Array<ChatMessageType>>([])

    useEffect(() => {
        const messageHandler = (e: MessageEvent) => {
            const newMessages = JSON.parse(e.data)
            setMessages((prevState) => [...prevState, ...newMessages])
        }
        wsChannel?.addEventListener('message', messageHandler)

        return () => {
            wsChannel?.removeEventListener('message', messageHandler)
        }
    }, [wsChannel])

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

const ChatMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [message, setMessage] = useState<string>('')
    const [isWSReady, setIsWSReady] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        const openHandler = () => {
            setIsWSReady('ready')
        }

        wsChannel?.addEventListener('open', openHandler)

        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }
    }, [wsChannel])

    const sendMessage = () => {
        if (!message)
            return

        wsChannel?.send(message)

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
                    <Button loading={wsChannel === null || isWSReady !== 'ready'} onClick={sendMessage}>Send</Button>
                </Col>
            </Row>
        </div>
    )
}

export default Chats