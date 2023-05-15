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
  isLike: number;
  summarize: string;
  audienceAge: number;
}
