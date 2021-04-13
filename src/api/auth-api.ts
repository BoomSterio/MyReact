import { instance, ApiResponseType, ResultCodesEnum, ResultCodeWithCaptchaEnum } from './api'

type MeResponceType = ApiResponseType<{
  id: number
  email: string
  login: string
}>

type LoginUserResponceType = ApiResponseType<{ userId: number }, ResultCodesEnum | ResultCodeWithCaptchaEnum>

export const authAPI = {
  me() {
    return instance.get<MeResponceType>(`auth/me`).then(res => res.data)
  },
  loginUser(email: string, password: string, rememberMe = false, captcha: null | string = null) {
    return instance
      .post<LoginUserResponceType>(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then(res => res.data)
  },
  logoutUser() {
    return instance.delete<ApiResponseType>(`auth/login`).then(res => res.data)
  },
}
