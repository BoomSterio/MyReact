export type ChatStatusType = 'pending' | 'ready' | 'error'

type EventNamesType = 'messages-received' | 'status-changed'

export type ChatMessageAPIType = {
  message: string
  photo: string
  userId: string
  userName: string
}

type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscriberType = (status: ChatStatusType) => void

type SubscribersType = {
  'messages-received': MessagesReceivedSubscriberType[]
  'status-changed': StatusChangedSubscriberType[]
}

let subscribers = {
  'messages-received': [] as MessagesReceivedSubscriberType[],
  'status-changed': [] as StatusChangedSubscriberType[],
} as SubscribersType

let ws: WebSocket | null = null

const closeHandler = () => {
  notifyStatusChangedSubscribers('pending')
  setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data)
  subscribers['messages-received'].forEach(s => s(newMessages))
}

const openHandler = () => {
  notifyStatusChangedSubscribers('ready')
}

const errorHandler = () => {
  notifyStatusChangedSubscribers('error')
  console.error('WS ERROR. REFRESH PAGE')
}

const cleanUp = () => {
  ws?.removeEventListener('close', closeHandler)
  ws?.removeEventListener('message', messageHandler)
  ws?.removeEventListener('open', openHandler)
  ws?.removeEventListener('error', errorHandler)
}

const notifyStatusChangedSubscribers = (status: ChatStatusType) => {
  subscribers['status-changed'].forEach(s => s(status))
}

const createChannel = () => {
  cleanUp()
  ws?.close()
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  notifyStatusChangedSubscribers('pending')
  ws?.addEventListener('close', closeHandler)
  ws?.addEventListener('message', messageHandler)
  ws?.addEventListener('open', openHandler)
  ws?.addEventListener('error', errorHandler)
}

export const chatAPI = {
  start() {
    createChannel()
  },
  stop() {
    subscribers['messages-received'] = []
    subscribers['status-changed'] = []
    cleanUp()
    ws?.close()
  },
  subscribe(eventName: EventNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
    // @ts-ignore
    subscribers[eventName].push(callback)
    return () => {
      // @ts-ignore
      subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    } //unsubscribe
  },
  unsubscribe(eventName: EventNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
    // @ts-ignore
    subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
  },
  sendMessage(message: string) {
    ws?.send(message)
  },
}
