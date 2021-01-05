import {setUserAuth} from "./auth-reducer";

const INITIALIZED_SUCCESS = "app/INITIALIZED_SUCCESS";

export type IntitialStateType = {
    initialized: boolean
}

let initialState : IntitialStateType = {
    initialized: false
}

const appReducer = (state = initialState, action: any): IntitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }

        default:
            return state;
    }
};

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS});

//thunk
export const initializeApp = () => (dispatch: any) => {
    let promiseUserData = dispatch(setUserAuth());
    Promise.all([promiseUserData])
        .then(() => {
            dispatch(initializedSuccess())
        })
}

export default appReducer;