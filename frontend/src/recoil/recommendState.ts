import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { content } from "interface/content";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
});

export const recGenreState = atom<Array<string>>({
  key: "recGenreState",
  default: [],
});

interface contentWithScore extends content {
  score: number;
}

export const recResultState = atom<Array<contentWithScore>>({
  key: "recResultState",
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

      score: 95,
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
      score: 95,
    },
    {
      pk: 3,
      title:
        "고병진이 살아있다 : Walking Moving Byeongjin 고병진이 살아있다 : Walking Moving Byeongjin",
      runtime: 88,
      rate: 1.2,
      imgPath: "https://images.justwatch.com/poster/8733916/s592/bagmulgwani-salaissda.webp",
      backdropPath:
        "https://images.justwatch.com/backdrop/271941308/s640/bagmulgwani-salaissda.webp",
      like: 1,
      type: "영화",
      season: 0,
      finalEpisode: 0,
      ott: {
        wavve: "https://www.wavve.com/player/movie?movieid=MV_CH01_FX0000011513",
        disney:
          "https://www.disneyplus.com/ko-kr/movies/night-at-the-museum/7CIEBLbWIbTR?irclickid=QtOQ7aX85xyNW8FQSXWPO3CrUkAX00XKjQzmRU0&irgwc=1&cid=DSS-Affiliate-Impact-Content-JustWatch+GmbH-705874&tgclid=0f010036-956b-4d13-8f00-1ef16459f3ec&dclid=CjkKEQjw3ueiBhD6mL2q9ajRr5ABEiQAewM-7icpU5wK0vK8mOV_QSB276CtpQmwQhrtxJqj3PNNgjHw_wcB",
      },
      genres: ["박물관", "리얼리티"],
      wish: false,

      summarize:
        "한참 어린 동생으로부터 스타 도전을 받은 걸무고, 과연 그는 저그의 자존심을 지켜낼 수 있을 것인가? 5월 1일. Python 개봉 박두",
      audienceAge: 15,
      score: 95,
    },
    {
      pk: 4,
      title: "박물관이 살아있다 : Walking Moving Museum",
      runtime: 8,
      rate: 1.2,
      imgPath: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      backdropPath: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      like: 1,
      type: "영화",
      season: 1,
      finalEpisode: 1,
      ott: {
        wavve: "https://www.wavve.com/player/movie?movieid=MV_CH01_FX0000011513",
        disney:
          "https://www.disneyplus.com/ko-kr/movies/night-at-the-museum/7CIEBLbWIbTR?irclickid=QtOQ7aX85xyNW8FQSXWPO3CrUkAX00XKjQzmRU0&irgwc=1&cid=DSS-Affiliate-Impact-Content-JustWatch+GmbH-705874&tgclid=0f010036-956b-4d13-8f00-1ef16459f3ec&dclid=CjkKEQjw3ueiBhD6mL2q9ajRr5ABEiQAewM-7icpU5wK0vK8mOV_QSB276CtpQmwQhrtxJqj3PNNgjHw_wcB",
      },
      genres: ["박물관", "리얼리티"],
      wish: false,

      summarize:
        "한참 어린 동생으로부터 스타 도전을 받은 걸무고, 과연 그는 저그의 자존심을 지켜낼 수 있을 것인가? 5월 1일. Python 개봉 박두",
      audienceAge: 15,
      score: 95,
    },
    {
      pk: 5,
      title: "박물관이 살아있다 : Walking Moving Museum",
      runtime: 8,
      rate: 1.2,
      imgPath: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      backdropPath: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      like: 1,
      type: "영화",
      season: 1,
      finalEpisode: 1,
      ott: {
        wavve: "https://www.wavve.com/player/movie?movieid=MV_CH01_FX0000011513",
        disney:
          "https://www.disneyplus.com/ko-kr/movies/night-at-the-museum/7CIEBLbWIbTR?irclickid=QtOQ7aX85xyNW8FQSXWPO3CrUkAX00XKjQzmRU0&irgwc=1&cid=DSS-Affiliate-Impact-Content-JustWatch+GmbH-705874&tgclid=0f010036-956b-4d13-8f00-1ef16459f3ec&dclid=CjkKEQjw3ueiBhD6mL2q9ajRr5ABEiQAewM-7icpU5wK0vK8mOV_QSB276CtpQmwQhrtxJqj3PNNgjHw_wcB",
      },
      genres: ["박물관", "리얼리티"],
      wish: false,

      summarize:
        "한참 어린 동생으로부터 스타 도전을 받은 걸무고, 과연 그는 저그의 자존심을 지켜낼 수 있을 것인가? 5월 1일. Python 개봉 박두",
      audienceAge: 15,
      score: 95,
    },
    {
      pk: 6,
      title: "박물관이 살아있다 : Walking Moving Museum",
      runtime: 8,
      rate: 1.2,
      imgPath: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      backdropPath: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      like: 1,
      type: "영화",
      season: 1,
      finalEpisode: 1,
      ott: {
        wavve: "https://www.wavve.com/player/movie?movieid=MV_CH01_FX0000011513",
        disney:
          "https://www.disneyplus.com/ko-kr/movies/night-at-the-museum/7CIEBLbWIbTR?irclickid=QtOQ7aX85xyNW8FQSXWPO3CrUkAX00XKjQzmRU0&irgwc=1&cid=DSS-Affiliate-Impact-Content-JustWatch+GmbH-705874&tgclid=0f010036-956b-4d13-8f00-1ef16459f3ec&dclid=CjkKEQjw3ueiBhD6mL2q9ajRr5ABEiQAewM-7icpU5wK0vK8mOV_QSB276CtpQmwQhrtxJqj3PNNgjHw_wcB",
      },
      genres: ["박물관", "리얼리티"],
      wish: false,

      summarize:
        "한참 어린 동생으로부터 스타 도전을 받은 걸무고, 과연 그는 저그의 자존심을 지켜낼 수 있을 것인가? 5월 1일. Python 개봉 박두",
      audienceAge: 15,
      score: 95,
    },
    {
      pk: 7,
      title: "박물관이 살아있다 : Walking Moving Museum",
      runtime: 8,
      rate: 1.2,
      imgPath: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      backdropPath: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      like: 1,
      type: "영화",
      season: 1,
      finalEpisode: 1,
      ott: {
        wavve: "https://www.wavve.com/player/movie?movieid=MV_CH01_FX0000011513",
        disney:
          "https://www.disneyplus.com/ko-kr/movies/night-at-the-museum/7CIEBLbWIbTR?irclickid=QtOQ7aX85xyNW8FQSXWPO3CrUkAX00XKjQzmRU0&irgwc=1&cid=DSS-Affiliate-Impact-Content-JustWatch+GmbH-705874&tgclid=0f010036-956b-4d13-8f00-1ef16459f3ec&dclid=CjkKEQjw3ueiBhD6mL2q9ajRr5ABEiQAewM-7icpU5wK0vK8mOV_QSB276CtpQmwQhrtxJqj3PNNgjHw_wcB",
      },
      genres: ["박물관", "리얼리티"],
      wish: false,

      summarize:
        "한참 어린 동생으로부터 스타 도전을 받은 걸무고, 과연 그는 저그의 자존심을 지켜낼 수 있을 것인가? 5월 1일. Python 개봉 박두",
      audienceAge: 15,
      score: 95,
    },
    {
      pk: 8,
      title: "박물관이 살아있다 : Walking Moving Museum",
      runtime: 8,
      rate: 1.2,
      imgPath: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      backdropPath: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      like: 1,
      type: "영화",
      season: 1,
      finalEpisode: 1,
      ott: {
        wavve: "https://www.wavve.com/player/movie?movieid=MV_CH01_FX0000011513",
        disney:
          "https://www.disneyplus.com/ko-kr/movies/night-at-the-museum/7CIEBLbWIbTR?irclickid=QtOQ7aX85xyNW8FQSXWPO3CrUkAX00XKjQzmRU0&irgwc=1&cid=DSS-Affiliate-Impact-Content-JustWatch+GmbH-705874&tgclid=0f010036-956b-4d13-8f00-1ef16459f3ec&dclid=CjkKEQjw3ueiBhD6mL2q9ajRr5ABEiQAewM-7icpU5wK0vK8mOV_QSB276CtpQmwQhrtxJqj3PNNgjHw_wcB",
      },
      genres: ["박물관", "리얼리티"],
      wish: false,

      summarize:
        "한참 어린 동생으로부터 스타 도전을 받은 걸무고, 과연 그는 저그의 자존심을 지켜낼 수 있을 것인가? 5월 1일. Python 개봉 박두",
      audienceAge: 15,
      score: 95,
    },
  ],
  effects_UNSTABLE: [persistAtom],
});
