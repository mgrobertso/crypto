export interface Search {
  coins: [
    {
      id: string;
      name: string;
      api_symbol: string;
      symbol: string;
      market_cap_rank: number;
      thumb: string;
      large: string;
    }
  ];
  exchanges: [];
  icos: [];
  categories: [
    {
      id: number;
      name: string;
    }
  ];
  nfts: [
    {
      id: string;
      name: string;
      symbol: string;
      thumb: string;
    }
  ];
}
