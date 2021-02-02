import {setUserAuth} from './auth-reducer'
import {BaseThunkType, InferActionsTypes} from './redux-store'

let initialState = {
    initialized: false
}

export type IntitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsTypes): IntitialStateType => {
    switch (action.type) {
        case 'app/INITIALIZED_SUCCESS': {
            return {
                ...state,
                initialized: true
            }
        }

        default:
            return state
    }
}

export const actions = {
    initializedSuccess: () => ({type: 'app/INITIALIZED_SUCCESS'} as const)
}

//thunk creators
//type ThunkType = BaseThunkType<ActionsTypes>

export const initializeApp = () => (dispatch: any) => {
    let promiseUserData = dispatch(setUserAuth())
    Promise.all([promiseUserData])
        .then(() => {
            dispatch(actions.initializedSuccess())
        })
}

export default appReducer