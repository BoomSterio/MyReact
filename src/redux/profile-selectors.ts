import { AppStateType } from './redux-store'

export const getProfile = (state: AppStateType) => {
  return state.profilePage.profile
}

export const getUserStatus = (state: AppStateType) => {
  return state.profilePage.status
}

export const getFollowed = (state: AppStateType) => {
  return state.profilePage.followStatus
}

export const getIsFollowingInProgress = (state: AppStateType) => {
  return state.profilePage.isFollowingInProgress
}

export const getNewPostText = (state: AppStateType) => {
  return state.profilePage.newPostText
}

export const getFetched = (state: AppStateType) => {
  return state.profilePage.fetched
}
