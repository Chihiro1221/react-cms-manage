export interface ResponseResult<T> {
  errCode: 0 | 1,
  message: string
  data: T
}