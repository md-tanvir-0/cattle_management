
export interface Cattle {
  id?: number;
  breed: string;
  weight: number;
  price: number;
  isAvailable: boolean;
}

export interface CattleResponse {
  data: Cattle[];
  total: number;
}