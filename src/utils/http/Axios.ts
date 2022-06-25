import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import {ResponseResult} from "../../../types/responseResult";

export default class Axios {
  public instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors()
  }

  public request<T = any, D = ResponseResult<T>>(config: AxiosRequestConfig): Promise<D> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.instance.request<D>(config)
        resolve(res.data)
      } catch {
        reject()
      }
    })
  }

  private interceptors() {
    this.requestInterceptor()
    this.responseInterceptor()
  }

  private requestInterceptor() {
    this.instance.interceptors.request.use(config => {
      return config
    }, err => {
      return Promise.reject(err.response)
    })
  }

  private responseInterceptor() {
    this.instance.interceptors.response.use(res => {
      return res
    }, err => {
      return Promise.reject(err.response)
    })
  }
}