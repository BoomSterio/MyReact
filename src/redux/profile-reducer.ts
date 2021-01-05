import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";

const ADD_POST = "profilePage/ADD_POST";
const DELETE_POST = "profilePage/DELETE_POST"
const SET_USER_PROFILE = "profilePage/SET_USER_PROFILE";
const SET_STATUS = "profilePage/SET_STATUS";
const SAVE_PHOTO_SUCCESS = "profilePage/SAVE_PHOTO_SUCCESS"

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
            name: "Сергей Зверей",
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
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
    newPostText: ""
};

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateType => {
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
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }

        default:
            return state;
    }
}

//action creators
type AddPostActionType = {
    type: typeof ADD_POST
    text: string
}
export const addPost = (text: string): AddPostActionType => ({type: ADD_POST, text});
type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({type: DELETE_POST, postId});//to do
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile});
type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status});
type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos})

//thunks
export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let responce = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(responce.data));
}

export const getStatus = (userId: number) => async (dispatch: any) => {
    let responce = await profileAPI.getStatus(userId);
    dispatch(setStatus(responce.data));
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    let responce = await profileAPI.updateStatus(status);
    if (responce.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
    let responce = await profileAPI.savePhoto(file);
    if (responce.data.resultCode === 0) {
        dispatch(savePhotoSuccess(responce.data.data.photos));
    }
}

export const saveProfileInfo = (profile: ProfileType) => async (dispatch: any) => {
    let responce = await profileAPI.saveProfileInfo(profile);
    if (responce.data.resultCode === 0) {
        dispatch(setUserProfile(profile));
    }
    else {
        let message = responce.data.messages.length >= 0 ? responce.data.messages[0] : "Unknown error";
        let action = stopSubmit("aboutForm", {_error: message});
        dispatch(action);
        return Promise.reject(responce.data.messages[0]);
    }
}

export default profileReducer;