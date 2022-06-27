import {message} from 'antd';
import axios, {AxiosRequestConfig} from 'axios';
import {ResponseResult} from '#/responseResult';
import {LoginResponse} from '@/apis/authApi';

export default class Axios {
  private instance;

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors();
  }

  public request<T, D = ResponseResult<T>>(config: AxiosRequestConfig) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.instance.request<D>(config);
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    }) as Promise<D>;
  }

  private interceptors() {
    this.requestInterceptor();
    this.responseInterceptor();
  }

  private requestInterceptor() {
    this.instance.interceptors.request.use(
        config => {
          const payload: LoginResponse = JSON.parse(localStorage.getItem('cms_token') || '{}');
          config.headers!['cms-token'] = payload['cms-token'];
          return config;
        },
        error => {
          return Promise.reject(error);
        }
    );
  }

  private responseInterceptor() {
    this.instance.interceptors.response.use(
        response => {
          return response;
        },
        error => {
          console.log(error.toString());
          if (error.toString().includes('timeout')) {
            return message.error('请求超时，请稍后重试！');
          }
          switch (error.response?.code) {
            case 401:
              break;
            case 422:
              break;
          }
          // return Promise.reject(error);
        }
    );
  }
}
