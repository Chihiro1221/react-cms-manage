import http from '../utils/http';

export interface authParams {
  username: string;
  password: string;
}

export interface LoginResponse {
  'cms-token': string;
  username: string;
  player: string;
  editable: 1 | 0;
  avatar: string;
}

/**
 * 注册
 * @param {authParams} params
 */
export const register = (params: authParams) => {
  return http.request({
    url: '/register',
    data: params,
    method: 'POST',
  });
};

/**
 * 登录
 * @param {authParams} params
 * @returns {Promise<LoginResponse>}
 */
export const login = (params: authParams) => {
  return http.request<LoginResponse>({
    url: '/login',
    method: 'POST',
    data: params,
  });
};

export interface UpdateUser {
  username?: string
  password?: string
}

/**
 * 更新用户信息
 * @param {UpdateUser} data
 */
export const updateUser = (data: UpdateUser) => {
  return http.request({
    url: 'info',
    method: 'PUT',
    data,
  });
}

export interface UserInfo {
  username: string
  avatar: string
  password: string
}

/**
 * 获取用户信息
 * @returns {Promise<UserInfo>}
 */
export const getUserInfo = () => {
  return http.request<UserInfo>({
    url: "info",
    method: "GET",
  })
}