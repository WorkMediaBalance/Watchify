export interface content {
  pk: number;
  title: string;
  runtime: number;
  rate: number;
  img_path: string;
  backdropPath: string;
  type: string;
  season: number;
  finalEpisode: number;
  ott: { [key: string]: string };
  genres: string[];
  isWish: boolean;
  isLike: number;
  summarize: string;
  audienceAge: number;
}
// TODO: 가로 포스터 이미지도 필요!
