import axios from 'axios'

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: { 'API-KEY': 'cbc2c291-81b5-4772-8310-eee4020aaac6' },
})

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeWithCaptchaEnum {
  CaptchaIsRequired = 10,
}

export type GetItemsType<T> = {
  items: Array<T>
  totalCount: number
  error: string | null
}

export type ApiResponseType<D = {}, C = ResultCodesEnum> = {
  data: D
  messages: Array<string>
  resultCode: C
}
