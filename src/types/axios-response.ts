import { AxiosResponse } from 'axios';

export type Response<T = any> = AxiosResponse<{
  status: 200;
  data: T;
}>;
