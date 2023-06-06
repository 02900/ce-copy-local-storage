export interface Tab {
  id: number;
  name: string;
  url?: string;
}

export interface Dictionary {
  [key: string]: string;
}

export interface PairKeyValue {
  key: string;
  value: string;
}
