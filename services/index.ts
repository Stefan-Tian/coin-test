import api from './api';
import { MarketsParams, MarketsResponse } from './types';

export default {
  getMarket: (params: MarketsParams) =>
    api<MarketsResponse>('get', '/coins/markets', params),
};
