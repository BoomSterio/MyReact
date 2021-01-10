import {ApiResponseType, GetItemsType, instance} from "./api";
import {UserType} from "../types/types";

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetItemsType<UserType>>(`users?page=${currentPage}&count=${pageSize}`)
            .then(responce => {
                return responce.data;
            });
    },
    postFollow(userId: number) {
        return instance.post<ApiResponseType>(`follow/${userId}`).then(res => res.data)
    },
    deleteFollow(userId: number) {
        return instance.delete<ApiResponseType>(`follow/${userId}`).then(res => res.data)
    }
}