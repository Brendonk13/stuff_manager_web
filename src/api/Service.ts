import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { camelizeKeys, decamelizeKeys } from "humps"

import getCookie from '@/utils/getCookie'

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}

export interface DefaultResponseData {
  message?: string
  data?: object
}

export interface DefaultError {
  data?: {
    error?: string
  }
}

const ApiBaseUrl = import.meta.env.VITE_API_URL

const instance = axios.create({
  baseURL: ApiBaseUrl,
  withCredentials: true,
  headers: {
    'Bypass-Tunnel-Reminder': 'true',
  },
})

// middleware to add the clerk bearer token to request
instance.interceptors.request.use(
  (config) => {
    const token = getCookie('__session')
    if (token){
      config.headers.Authorization = `Bearer ${token}`
    } else {
      config.headers.Authorization = undefined
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  },
)


// https://dev.to/giovanniantonaccio/configuring-a-camelcase-to-snakecase-parser-with-axios-bld
// Axios middleware to convert all api requests to snake_case
instance.interceptors.request.use(config => {
  const newConfig = { ...config }

  if (newConfig.headers['Content-Type'] === 'multipart/form-data')
    return newConfig

  if (config.params) {
    newConfig.params = decamelizeKeys(config.params)
  }

  if (config.data) {
    newConfig.data = decamelizeKeys(config.data)
  }

  return newConfig
})

// Axios middleware to convert all api responses to camelCase
instance.interceptors.response.use((response: AxiosResponse) => {
  if (
    response.data &&
    response.headers['content-type'] === 'application/json'
  ) {
    response.data = camelizeKeys(response.data)
  }

  return response
})

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error(error)
    return handleError(error)
  },
)

function handleError(error: AxiosError) {
  const { response } = error

  switch (response?.status) {
    case StatusCode.InternalServerError: {
      // Handle InternalServerError
      break
    }
    case StatusCode.Forbidden: {
      // Handle Forbidden
      break
    }
    case StatusCode.Unauthorized: {
      // Handle Unauthorized
      break
    }
    case StatusCode.TooManyRequests: {
      // Handle TooManyRequests
      break
    }
  }

  return Promise.reject(error)
}

interface ApiServiceFactory {
  baseURL?: string
}

interface IApiService {
  get: typeof instance.get
  post: typeof instance.post
  put: typeof instance.put
  delete: typeof instance.delete
  request: typeof instance.request
}

export function CreateApiService({
  baseURL = '',
}: ApiServiceFactory): IApiService {
  const buildURL = (url: string) => `${baseURL}${url}`
  return {
    get: <T = DefaultResponseData, R = AxiosResponse<T>>(
      url: string,
      config: AxiosRequestConfig,
    ): Promise<R> => instance.get<T, R>(buildURL(url), config),
    post: <T = DefaultResponseData, R = AxiosResponse<T>, D = object>(
      url: string,
      data: D,
      config: AxiosRequestConfig,
    ): Promise<R> => instance.post<T, R>(buildURL(url), data, config),
    put: <T = DefaultResponseData, R = AxiosResponse<T>, D = object>(
      url: string,
      data: D,
      config: AxiosRequestConfig,
    ): Promise<R> => instance.put<T, R>(buildURL(url), data, config),
    delete: <T = DefaultResponseData, R = AxiosResponse<T>>(
      url: string,
      config: AxiosRequestConfig,
    ): Promise<R> => instance.delete<T, R>(buildURL(url), config),
    request: <T = DefaultResponseData, R = AxiosResponse<T>>(
      config: AxiosRequestConfig,
    ): Promise<R> =>
      instance.request<T, R>({
        url: buildURL(config?.url || ''),
        ...config,
      }),
  }
}

const ApiService = instance

export default ApiService
