import { FormAction, stopSubmit } from 'redux-form'
import { PhotosType, PostType, ProfileType } from '../types/types'
import { BaseThunkType, InferActionsTypes } from './redux-store'
import { profileAPI } from '../api/profile-api'
import { usersAPI } from '../api/users-api'

let initialState = {
  posts: [
    {
      id: 1,
      message: 'Hi bro',
      name: 'Яна Цист',
      likes: 69,
      img:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSm_fOn75B7WzCl9gIhBqAqjiSmCIqwdQrDEHzf0HTIfCqCq1Vj71iszAMirZc4alSA0ygIgWxOAY5fiSypsQTCvd6r4uNmGqjt70ueivg&usqp=CAU&ec=45725303',
    },
    {
      id: 2,
      message: 'test',
      name: 'Chehov Anton',
      likes: 100,
      img: 'https://i.pinimg.com/564x/f1/23/05/f1230501d33cb2c6055b2d6ea221a22d.jpg',
    },
    {
      id: 3,
      message: 'would you hug me',
      name: 'Сергей Зверей',
      likes: 14,
      img: 'https://media.tenor.com/images/c50ba1f5c34496af4f9eb2a805ef29ea/tenor.gif',
    },
    {
      id: 4,
      message: 'dsfdsfsdwe, ds;ll ckushd ewrouihwfeo 2892u3  8f9sdfu8 89us',
      name: 'Жечка Дырова',
      likes: 61,
      img: 'https://pbs.twimg.com/media/C5AmsxoWIAAWlfS.jpg',
    },
    {
      id: 5,
      message: 'каво',
      name: 'Big Brother',
      likes: 26,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRB_mt5A7b2-UR_9NKmESs-1OJ9-daZW9xaeg&usqp=CAU',
    },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: '',
  followStatus: false,
  isFollowingInProgress: false,
  newPostText: '',
  fetched: false,
}
export type InitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'profilePage/ADD_POST': {
      if (action.text === '' || action.text === undefined) return state

      let newPost = {
        id: 6,
        message: action.text,
        name: 'Капитан Жмышенко',
        likes: 0,
        img: 'https://i.kym-cdn.com/entries/icons/original/000/028/692/cat.jpg',
      }

      return {
        ...state,
        /*newPostText: "",*/
        posts: [...state.posts, newPost],
      }
    }
    case 'profilePage/SET_USER_PROFILE': {
      return {
        ...state,
        profile: action.profile,
      }
    }
    case 'profilePage/SET_STATUS': {
      return {
        ...state,
        status: action.status,
      }
    }
    case 'profilePage/SET_FOLLOW_STATUS': {
      return {
        ...state,
        followStatus: action.followStatus,
      }
    }
    case 'profilePage/SET_IS_FOLLOWING_IN_PROGRESS': {
      return {
        ...state,
        isFollowingInProgress: action.isFollowingInProgress,
      }
    }
    case 'profilePage/DELETE_POST': {
      return {
        ...state,
        posts: state.posts.filter(p => p.id !== action.postId),
      }
    }
    case 'profilePage/SAVE_PHOTO_SUCCESS': {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      }
    }
    case 'profilePage/SET_FETCHED': {
      return {
        ...state,
        fetched: action.fetched,
      }
    }

    default:
      return state
  }
}

//action creators
export const actions = {
  addPost: (text: string) => ({ type: 'profilePage/ADD_POST', text } as const),
  deletePost: (postId: number) => ({ type: 'profilePage/DELETE_POST', postId } as const),
  setUserProfile: (profile: ProfileType) => ({ type: 'profilePage/SET_USER_PROFILE', profile } as const),
  setStatus: (status: string) => ({ type: 'profilePage/SET_STATUS', status } as const),
  setFollowStatus: (followStatus: boolean) => ({ type: 'profilePage/SET_FOLLOW_STATUS', followStatus } as const),
  setIsFollowingInProgress: (isFollowingInProgress: boolean) =>
    ({
      type: 'profilePage/SET_IS_FOLLOWING_IN_PROGRESS',
      isFollowingInProgress,
    } as const),
  savePhotoSuccess: (photos: PhotosType) => ({ type: 'profilePage/SAVE_PHOTO_SUCCESS', photos } as const),
  setFetched: (fetched: boolean) => ({ type: 'profilePage/SET_FETCHED', fetched } as const),
}

//thunk creators
type ThunkType = BaseThunkType<ActionsTypes | FormAction>

export const getUserProfile = (userId: number): ThunkType => async dispatch => {
  let data = await profileAPI.getProfile(userId)
  dispatch(actions.setUserProfile(data))
  dispatch(actions.setFetched(true))
}

export const getStatus = (userId: number): ThunkType => async dispatch => {
  let data = await profileAPI.getStatus(userId)
  dispatch(actions.setStatus(data))
}

export const getFollowStatus = (userId: number): ThunkType => async dispatch => {
  let data = await usersAPI.getFollow(userId)
  dispatch(actions.setFollowStatus(data))
}

export const follow = (userId: number): ThunkType => async dispatch => {
  dispatch(actions.setIsFollowingInProgress(true))
  let data = await usersAPI.postFollow(userId)
  if (data.resultCode === 0) {
    dispatch(actions.setFollowStatus(true))
  } else {
    return Promise.reject(data.messages[0])
  }
  dispatch(actions.setIsFollowingInProgress(false))
}

export const unfollow = (userId: number): ThunkType => async dispatch => {
  dispatch(actions.setIsFollowingInProgress(true))
  let data = await usersAPI.deleteFollow(userId)
  if (data.resultCode === 0) {
    dispatch(actions.setFollowStatus(false))
  } else {
    return Promise.reject(data.messages[0])
  }
  dispatch(actions.setIsFollowingInProgress(false))
}

export const updateStatus = (status: string): ThunkType => async dispatch => {
  let data = await profileAPI.updateStatus(status)
  if (data.resultCode === 0) {
    dispatch(actions.setStatus(status))
  }
}

export const savePhoto = (file: File): ThunkType => async dispatch => {
  let data = await profileAPI.savePhoto(file)

  if (data.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(data.data.photos))
  }
}

export const saveProfileInfo = (profile: ProfileType): ThunkType => async dispatch => {
  let data = await profileAPI.saveProfileInfo(profile)
  if (data.resultCode === 0) {
    dispatch(actions.setUserProfile(profile))
  } else {
    let message = data.messages.length >= 0 ? data.messages[0] : 'Unknown error'
    let action = stopSubmit('aboutForm', { _error: message })
    dispatch(action)
    return Promise.reject(data.messages[0])
  }
}

export const fetchingStarted = (): ThunkType => async dispatch => {
  dispatch(actions.setFetched(false))
}

export default profileReducer
