import { atom } from "recoil";
import { content } from "interface/content";

export interface HistoryContent extends content {
  firstYear: number;
  firstMonth: number;
  firstDay: number;
  isComplete: boolean;
}

export interface HistoryDetailContent extends content {
  date: string;
  episode: number;
}

export const historyState = atom<Array<HistoryContent>>({
  key: "historyState",
  default: [
    {
      pk: 1,
      title: "더 글로리",
      runtime: 50,
      rate: 4.5,
      imgPath: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      backdropPath: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      like: 1,
      type: "드라마",
      season: 1,
      finalEpisode: 10,
      ott: { netflix: "https://www.netflix.com/kr/title/81519223" },
      genres: ["드라마"],
      wish: false,
      summarize:
        "어느 날 길을 걷던 걸무고는 우연히 알 수 없는 동전을 줍게 되고, 이 동전의 충격적인 정체가 알려지며 사건에 휩싸이게 되는데... 과연 걸무고는 무사할 수 있을까?",
      audienceAge: 15,
      firstYear: 2023,
      firstMonth: 5,
      firstDay: 17,
      isComplete: false,
    },
    {
      pk: 2,
      title: "트와일라잇",
      runtime: 60,
      rate: 3.7,
      imgPath: "https://images.justwatch.com/poster/129382738/s592/twilight.webp",
      backdropPath: "https://images.justwatch.com/backdrop/689774/s640/twilight.webp",
      like: 1,
      type: "영화",
      season: 0,
      finalEpisode: 0,
      ott: {
        wavve: "https://www.wavve.com/player/movie?movieid=MV_LO01_LO0000000038",
        watcha: "https://watcha.com/contents/myWqyBW",
      },
      genres: ["야생", "뱀파이어"],
      wish: true,

      summarize: "뱀파이어가 울부지저따. 뱀파이어는 짱 쎄따. 크와아앙",
      audienceAge: 15,
      firstYear: 2023,
      firstMonth: 4,
      firstDay: 13,
      isComplete: true,
    },
  ],
});

export const historyDetailState = atom<{ [key: number]: HistoryDetailContent[] }>({
  key: "historyDetailState",
  default: {
    1: [
      {
        pk: 1,
        title: "더 글로리",
        date: "2023-05-01",
        runtime: 50,
        rate: 4.5,
        imgPath: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
        backdropPath: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
        like: 1,
        type: "드라마",
        season: 1,
        finalEpisode: 10,
        ott: { netflix: "https://www.netflix.com/kr/title/81519223" },
        genres: ["드라마"],
        wish: false,
        summarize:
          "어느 날 길을 걷던 걸무고는 우연히 알 수 없는 동전을 줍게 되고, 이 동전의 충격적인 정체가 알려지며 사건에 휩싸이게 되는데... 과연 걸무고는 무사할 수 있을까?",
        audienceAge: 15,
        episode: 1,
      },
    ],
    2: [
      {
        pk: 1,
        title: "더 글로리",
        date: "2023-05-02",
        runtime: 50,
        rate: 4.5,
        imgPath: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
        backdropPath: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
        like: 1,
        type: "드라마",
        season: 1,
        finalEpisode: 10,
        ott: { netflix: "https://www.netflix.com/kr/title/81519223" },
        genres: ["드라마"],
        wish: false,
        summarize:
          "어느 날 길을 걷던 걸무고는 우연히 알 수 없는 동전을 줍게 되고, 이 동전의 충격적인 정체가 알려지며 사건에 휩싸이게 되는데... 과연 걸무고는 무사할 수 있을까?",
        audienceAge: 15,
        episode: 2,
      },
    ],
    11: [
      {
        pk: 1,
        title: "더 글로리",
        date: "2023-05-11",
        runtime: 50,
        rate: 4.5,
        imgPath: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
        backdropPath: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
        like: 1,
        type: "드라마",
        season: 1,
        finalEpisode: 10,
        ott: { netflix: "https://www.netflix.com/kr/title/81519223" },
        genres: ["드라마"],
        wish: false,
        summarize:
          "어느 날 길을 걷던 걸무고는 우연히 알 수 없는 동전을 줍게 되고, 이 동전의 충격적인 정체가 알려지며 사건에 휩싸이게 되는데... 과연 걸무고는 무사할 수 있을까?",
        audienceAge: 15,
        episode: 3,
      },
    ],
    17: [
      {
        pk: 1,
        title: "더 글로리",
        date: "2023-05-17",
        runtime: 50,
        rate: 4.5,
        imgPath: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
        backdropPath: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
        like: 1,
        type: "드라마",
        season: 1,
        finalEpisode: 10,
        ott: { netflix: "https://www.netflix.com/kr/title/81519223" },
        genres: ["드라마"],
        wish: false,
        summarize:
          "어느 날 길을 걷던 걸무고는 우연히 알 수 없는 동전을 줍게 되고, 이 동전의 충격적인 정체가 알려지며 사건에 휩싸이게 되는데... 과연 걸무고는 무사할 수 있을까?",
        audienceAge: 15,
        episode: 4,
      },
    ],
    23: [
      {
        pk: 1,
        title: "더 글로리",
        date: "2023-05-23",
        runtime: 50,
        rate: 4.5,
        imgPath: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
        backdropPath: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
        like: 1,
        type: "드라마",
        season: 1,
        finalEpisode: 10,
        ott: { netflix: "https://www.netflix.com/kr/title/81519223" },
        genres: ["드라마"],
        wish: false,
        summarize:
          "어느 날 길을 걷던 걸무고는 우연히 알 수 없는 동전을 줍게 되고, 이 동전의 충격적인 정체가 알려지며 사건에 휩싸이게 되는데... 과연 걸무고는 무사할 수 있을까?",
        audienceAge: 15,
        episode: 5,
      },
    ],
  },
});
