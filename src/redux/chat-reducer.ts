import {BaseThunkType, InferActionsTypes} from './redux-store'
import {chatAPI} from '../api/chat-api'
import {ChatMessageType} from '../types/types'
import {Dispatch} from 'redux'

let initialState = {
    messages: [] as ChatMessageType[]
}
export type InitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'chat/MESSAGES_RECEIVED': {
            return {
                ...state,
                messages: [...state.messages, ...action.messages]
            }
        }

        default:
            return state
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({type: 'chat/MESSAGES_RECEIVED', messages} as const)
}

let _newMessagesHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessagesHandlerCreator = (dispatch: Dispatch) => {
    if(_newMessagesHandler === null) {
        _newMessagesHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }

    return _newMessagesHandler
}

//thunk creators
type ThunkType = BaseThunkType<ActionsTypes>

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessagesHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe(newMessagesHandlerCreator(dispatch))
    chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}

export default chatReducer