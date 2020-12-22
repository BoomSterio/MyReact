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
    },
    loginUser(email, password, rememberMe=false, captcha=null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    logoutUser() {
        return instance.delete(`auth/login`)
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status) {
        return instance.put(`profile/status/`, {status})
    },
    savePhoto(file) {
        const formData = new FormData();
        formData.append("image", file);

        return instance.put(`profile/photo/`, formData, {
            headers: {'Content-type': 'multipart/form-data'}
        })
    },
    saveProfileInfo(profile) {
        return instance.put(`profile/`, profile)
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    }
}


