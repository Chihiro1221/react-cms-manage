import http from "../utils/http";

interface RegisterParams {
  username: string
  password: string
}

/**
 * 注册
 * @param {RegisterParams} params
 */
export const register = (params: RegisterParams) => {
  return http.request({
    url: 'register',
    data: params,
  })
}