import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {Alert, Avatar, Badge, Button, Comment, Tag} from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/chat-reducer'
import { AppStateType } from '../../redux/redux-store'
import userPfp from '../../assets/images/user.jpg'
import { ChatMessageAPIType } from '../../api/chat-api'
import { DownOutlined, SendOutlined } from '@ant-design/icons'

const Chats: React.FC = () => {
  return (
    <div>
      <ul>
        <Tag color="blue">ITEC</Tag>
        <Tag color="blue">English class</Tag>
        <Tag color="geekblue">TChat</Tag>
      </ul>
      <Chat />
    </div>
  )
}

const Chat: React.FC = () => {
  const dispatch = useDispatch()

  const chatStatus = useSelector((state: AppStateType) => state.chat.status)

  useEffect(() => {
    dispatch(startMessagesListening())
    return () => {
      dispatch(stopMessagesListening())
    }
  }, [])

  return (
    <div>
      {chatStatus === 'error' && <Alert closable showIcon message="WS error occured" description="Please refresh the page." type="error" />}
      <Messages />
      <MessageForm />
    </div>
  )
}

const Messages: React.FC = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages)
  const messagesAnchorRef = useRef<HTMLDivElement>(null)
  const [isAutoScroll, setIsAutoScroll] = useState(true)
  //const [isAnyUnread, setIsAnyUnread] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [showBadge, setShowBadge] = useState(false)

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    let element = e.currentTarget
    if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 100) {
      !isAutoScroll && setIsAutoScroll(true)
      setUnreadCount(0)
      setShowBadge(false)
    } else {
      isAutoScroll && setIsAutoScroll(false)
      setShowBadge(true)
    }
  }

  const goDown = () => {
    messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    setUnreadCount(unreadCount + 1)
    if (isAutoScroll) {
      goDown()
      setUnreadCount(0)
    }
  }, [messages])

  return (
    <div>
      <div style={{ height: '27.5vw', overflowY: 'auto' }} onScroll={scrollHandler}>
        {messages.map(m => (
          <Message message={m} key={m.id} />
        ))}
        <div ref={messagesAnchorRef} />
      </div>
      {showBadge && (
        <div style={{ position: 'absolute', top: '67.5%', left: '50%' }}>
          <Badge count={unreadCount}>
            <Button color={'primary'} shape={'circle'} icon={<DownOutlined />} onClick={goDown} />
          </Badge>
        </div>
      )}
    </div>
  )
}

const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({ message }) => {
  return (
    <div style={{}}>
      <Comment
        author={
          <Link to={`/profile/${message.userId}`}>
            <b>{message.userName}</b>
          </Link>
        }
        content={<p>{message.message}</p>}
        avatar={
          <Link to={`/profile/${message.userId}`}>
            <Avatar src={message.photo ? message.photo : userPfp} alt={'pfp'} />
          </Link>
        }
      />
    </div>
  )
})

const MessageForm: React.FC = () => {
  const [message, setMessage] = useState<string>('')

  const chatStatus = useSelector((state: AppStateType) => state.chat.status)

  const dispatch = useDispatch()

  const sendMessageHandler = () => {
    if (!message) return

    dispatch(sendMessage(message))

    setMessage('')
  }

  //todo: sending message on pressing CTRL+ENTER

  return (
    <div style={{display: 'flex', alignItems: 'center', maxWidth: '650px'}}>
      <TextArea
        autoSize={{ minRows: 2, maxRows: 5 }}
        value={message}
        onChange={e => {
          setMessage(e.target.value)
        }}
      />
      <Button
        htmlType={'submit'}
        loading={chatStatus !== 'ready'}
        icon={<SendOutlined />}
        size={'large'}
        style={{ width: '45px', height: '45px', marginLeft: '10px' }}
        onClick={sendMessageHandler}
      />
    </div>
  )
}

export default Chats
