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
  like: number;
  summarize: string;
  audienceAge: number;
}

export interface HistoryDetailContent extends content {
  date: string;
  episode: number;
}

export interface ShareDetailContent extends content {
  date: string;
  episode: number;
}
