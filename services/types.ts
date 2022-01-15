export type MarketsResponse = {
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
  roi: number | null;
  lastUpdated: string;
};

export type OrderType =
  | 'market_cap_desc'
  | 'gecko_desc'
  | 'gecko_asc'
  | 'market_cap_asc'
  | 'market_cap_desc'
  | 'volume_asc'
  | 'volume_desc'
  | 'id_asc'
  | 'id_desc';

export type MarketsParams = {
  vsCurrency: string;
  ids?: string;
  category?: string;
  order?: OrderType;
  perPage?: number;
  page?: number;
  sparkline?: boolean;
  priceChangePercentage?: string;
};
