export interface content {
  pk: number;
  title: string;
  runtime: number;
  rate: number;
  imgPath: string;
  backdropPath: string;
  type: string;
  season: number;
  finalEpisode: number;
  ott: { [key: string]: string };
  genres: string[];
  wish: boolean;
  // ★★★ 곧 사망할 친구
  isLike: number;
  summarize: string;
  audienceAge: number;
  // ★★★ API 수정후 추가 필요 (평점)
  // rating: number
}
