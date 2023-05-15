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
