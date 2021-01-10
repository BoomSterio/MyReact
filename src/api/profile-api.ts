import {PhotosType, ProfileType} from "../types/types";
import {ApiResponseType, instance} from "./api";

type SavePhotoResponceType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(res => res.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<ApiResponseType>(`profile/status/`, {status}).then(res => res.data)
    },
    savePhoto(file: File) {
        const formData = new FormData();
        formData.append("image", file);

        return instance.put<ApiResponseType<SavePhotoResponceType>>(`profile/photo/`, formData, {
            headers: {'Content-type': 'multipart/form-data'}
        }).then(res => res.data)
    },
    saveProfileInfo(profile: ProfileType) {
        return instance.put<ApiResponseType>(`profile/`, profile).then(res => res.data)
    }
}