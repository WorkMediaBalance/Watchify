export interface user {
  pk: number;
  name: string;
  imgPath: string;
}

// 구독한 OTT 목록
export interface subscription {
  [key: string]: {
    start: string | null;
    end: string | null;
  };
}
