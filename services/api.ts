import axios, { AxiosResponse } from 'axios';
import utils from './utils';

const BASE_API = 'https://api.coingecko.com/api/v3';

const instance = axios.create({
  baseURL: BASE_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  (response: any) => utils.camelizeKeys(response.data) as AxiosResponse,
  (error: Error) => Promise.reject(error)
);

type ApiMethod = 'get' | 'post' | 'put' | 'delete';
export default function <T>(method: ApiMethod, url: string, data: any = null) {
  const requestType = method.toLowerCase();
  const normalizedParams = utils.snakifyKeys(data);

  switch (requestType) {
    case 'get':
      return instance.get(url, { params: normalizedParams }) as Promise<T>;
    case 'post':
      return instance.post(url, normalizedParams) as Promise<T>;
    case 'delete':
      return instance.delete(url, { params: normalizedParams }) as Promise<T>;
    case 'put':
      return instance.put(url, normalizedParams) as Promise<T>;
    default:
      throw new Error(`Unknown request method ${method}`);
  }
}
