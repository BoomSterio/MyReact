import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {"API-KEY": "cbc2c291-81b5-4772-8310-eee4020aaac6"}
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(responce => {
                return responce.data;
            });
    },
    postFollow(userId) {
        return instance.post(`follow/${userId}`)
    },
    deleteFollow(userId) {
        return instance.delete(`follow/${userId}`)
    }

}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
    }
}


