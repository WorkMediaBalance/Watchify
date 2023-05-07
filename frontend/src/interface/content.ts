export interface content {
  pk: number;
  title: string;
  runtime: number;
  rate: number;
  img_path: string;
  type: string;
  season: number;
  finalEpisode: number;
  ott: string[];
  genres: string[];
  isWish: boolean;
  summarize: string;
  audienceAge: number;
}
// TODO: 가로 포스터 이미지도 필요!
