import {setUserAuth} from "./auth-reducer";

const INITIALIZED_SUCCESS = "app/INITIALIZED_SUCCESS";

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
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

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

//thunk
export const initializeApp = () => (dispatch) => {
    let promiseUserData = dispatch(setUserAuth());
    Promise.all([promiseUserData])
        .then(() => {
            dispatch(initializedSuccess())
        })
}

export default appReducer;