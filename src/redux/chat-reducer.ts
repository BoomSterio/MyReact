import { BaseThunkType, InferActionsTypes } from './redux-store'
import { chatAPI, ChatMessageAPIType, ChatStatusType } from '../api/chat-api'
import { Dispatch } from 'redux'
import { v1 } from 'uuid'

type ChatMessageType = ChatMessageAPIType & { id: string }

let initialState = {
  messages: [] as ChatMessageType[],
  status: 'pending' as ChatStatusType,
}
export type InitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'chat/MESSAGES_RECEIVED': {
      return {
        ...state,
        messages: [...state.messages, ...action.messages.map(m => ({ ...m, id: v1() }))].filter((m, index, array) => index >= array.length - 100),
      }
    }
    case 'chat/STATUS_CHANGED': {
      return {
        ...state,
        status: action.status,
      }
    }

    default:
      return state
  }
}

export const actions = {
  messagesReceived: (messages: ChatMessageAPIType[]) => ({ type: 'chat/MESSAGES_RECEIVED', messages } as const),
  statusChanged: (status: ChatStatusType) => ({ type: 'chat/STATUS_CHANGED', status } as const),
}

let _newMessagesHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessagesHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessagesHandler === null) {
    _newMessagesHandler = messages => {
      dispatch(actions.messagesReceived(messages))
    }
  }

  return _newMessagesHandler
}

let _statusChangedHandler: ((status: ChatStatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = status => {
      dispatch(actions.statusChanged(status))
    }
  }

  return _statusChangedHandler
}

//thunk creators
type ThunkType = BaseThunkType<ActionsTypes>

export const startMessagesListening = (): ThunkType => async dispatch => {
  chatAPI.start()
  chatAPI.subscribe('messages-received', newMessagesHandlerCreator(dispatch))
  chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async dispatch => {
  chatAPI.unsubscribe('messages-received', newMessagesHandlerCreator(dispatch))
  chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
  chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async dispatch => {
  chatAPI.sendMessage(message)
}

export default chatReducer
