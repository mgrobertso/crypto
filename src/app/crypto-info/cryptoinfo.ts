export interface cryptoInfo {
  id: string;
  symbol: string;
  name: string;
  asset_platform_id: null;
  block_time_in_minutes: number;
  hashing_algorithm: string;
  description: {
    en: string;
  };
  links: {
    homepage: [];
    blockchain_site: [];
    official_forum_url: [];
    chat_url: [];
    announcement_url: [];
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_cap_rank: number;
  market_data: {
    current_price: {
      usd: number;
    };
    high_24h: {
      usd: number;
    };
    low_24h: {
      usd: number;
    };
  };
}
