import {profileAPI} from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

let initialState = {
    posts: [
        {
            id: 1,
            message: "Hi bro",
            name: "Kabluk Jma",
            likes: 69,
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSm_fOn75B7WzCl9gIhBqAqjiSmCIqwdQrDEHzf0HTIfCqCq1Vj71iszAMirZc4alSA0ygIgWxOAY5fiSypsQTCvd6r4uNmGqjt70ueivg&usqp=CAU&ec=45725303"
        },
        {
            id: 2,
            message: "stop bullying me",
            name: "Fikalis Anton",
            likes: 100,
            img: "https://i.pinimg.com/564x/f1/23/05/f1230501d33cb2c6055b2d6ea221a22d.jpg"
        },
        {
            id: 3,
            message: "would you hug me",
            name: "Kakun Barov",
            likes: 14,
            img: "https://media.tenor.com/images/c50ba1f5c34496af4f9eb2a805ef29ea/tenor.gif"
        },
        {
            id: 4,
            message: "каво",
            name: "Big Brother",
            likes: 26,
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRB_mt5A7b2-UR_9NKmESs-1OJ9-daZW9xaeg&usqp=CAU"
        },
        {
            id: 5,
            message: "это я, киборг",
            name: "Герой Украины",
            likes: 61,
            img: "https://pbs.twimg.com/media/C5AmsxoWIAAWlfS.jpg"
        },
    ],
    profile: null,
    newPostText: "",
    status: ""
};

const profileReducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            if (action.text==="" || action.text===undefined)
                return state;

            let newPost = {
                id: 6,
                message: action.text,
                name: "Капитан Жмышенко",
                likes: 0,
                img: "https://i.kym-cdn.com/entries/icons/original/000/028/692/cat.jpg"
            }

            return {
                ...state,
                /*newPostText: "",*/
                posts: [...state.posts, newPost]
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state, profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state, status: action.status
            }
        }

        default:
            return state;
    }
}

export const addPost = (text) => ({ type: ADD_POST, text: text});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});

//thunks
export const getUserProfile = (userId) => (dispatch) => {
    profileAPI.getProfile(userId).then(responce => {
        dispatch(setUserProfile(responce.data));
    });
}

export const getStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId).then(responce => {
        dispatch(setStatus(responce.data));
    })
}

export const updateStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status).then(responce => {
        if(responce.data.resultCode === 0){
            dispatch(setStatus(status));
        }
    })
}

export default profileReducer;