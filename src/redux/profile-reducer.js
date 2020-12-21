import {profileAPI} from "../api/api";

const ADD_POST = "profilePage/ADD_POST";
const DELETE_POST = "profilePage/DELETE_POST"
const SET_USER_PROFILE = "profilePage/SET_USER_PROFILE";
const SET_STATUS = "profilePage/SET_STATUS";

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
    status: ""
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            if (action.text === "" || action.text === undefined)
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
        case DELETE_POST: {
            return {
                ...state, posts: state.posts.filter(p => p.id !== action.postId)
            }
        }

        default:
            return state;
    }
}

export const addPost = (text) => ({type: ADD_POST, text});
export const deletePost = (postId) => ({type: DELETE_POST, postId});        //to do
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});

//thunks
export const getUserProfile = (userId) => async (dispatch) => {
    let responce = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(responce.data));
}

export const getStatus = (userId) => async (dispatch) => {
    let responce = await profileAPI.getStatus(userId)
    dispatch(setStatus(responce.data));
}

export const updateStatus = (status) => async (dispatch) => {
    let responce = await profileAPI.updateStatus(status)
    if (responce.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export default profileReducer;