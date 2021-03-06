export type CoinMarketData = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  marketCap: number;
  marketCapRank: number;
  fullyDilutedValuation: number;
  totalVolume: number;
  high24h: number;
  low24h: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
  marketCapChange24h: number;
  marketCapChangePercentage24h: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;
  ath: number;
  athChangePercentage: number;
  athDate: string;
  roi: number;
  lastUpdated: string;
};

export type MarketsResponse = CoinMarketData[];

export type OrderType =
  | 'volume_desc'
  | 'price_desc'
  | 'price_asc'
  | 'gecko_desc'
  | 'gecko_asc'
  | 'volume_asc';

export type MarketsParams = {
  vsCurrency: string;
  ids?: string;
  category?: string;
  order?: OrderType;
  perPage?: number;
  page: number;
  sparkline?: boolean;
  priceChangePercentage?: string;
};
