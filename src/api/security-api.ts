import {instance} from './api'

type GetCaptchaUrlResponceType = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlResponceType>(`security/get-captcha-url`)
    }
}