import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { content } from "interface/content";
import { user } from "interface/user";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
});

export const isLoggedInState = atom<boolean>({
  key: "isLoggedInState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const userState = atom<user>({
  key: "userState",
  default: { pk: 0, name: "", imgPath: "" },
  effects_UNSTABLE: [persistAtom],
});

export const ottThemeState = atom<string>({
  key: "ottThemeState",
  default: "netflix",
  effects_UNSTABLE: [persistAtom],
});

// 구독한 OTT 목록
// type Subscription = {
//   [key: string]: {
//     start: string | null;
//     end: string | null;
//   };
// };

// export const ottSubscriptionState = atom<Subscription>({
//   key: "ottSubscriptionState",
//   default: {
//     netflix: { start: "2023-04-15", end: null },
//     watcha: { start: null, end: null },
//     wavve: { start: "2023-01-17", end: "2023-06-16" },
//     disney: { start: null, end: null },
//   },
// });

// 찜 목록
export const essListState = atom<content[]>({
  key: "essListState",
  default: [],
});

export const wishListState = atom<content[]>({
  key: "wishListState",
  default: [
    {
      pk: 12321,
      title: "박물관이 살아있다 : Walking Moving Museum",
      runtime: 8,
      rate: 1.2,
      imgPath: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      backdropPath: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      like: 1,
      type: "드라마",
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
    },
    {
      pk: 2,
      title: "트와일라잇",
      runtime: 60,
      rate: 3.7,
      imgPath: "https://images.justwatch.com/poster/129382738/s592/twilight.webp",
      backdropPath: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      like: 1,
      type: "영화",
      season: 1,
      finalEpisode: 1,
      ott: {
        wavve: "https://www.wavve.com/player/movie?movieid=MV_LO01_LO0000000038",
        watcha: "https://watcha.com/contents/myWqyBW",
      },
      genres: ["박물관", "리얼리티"],
      wish: false,

      summarize:
        "한참 어린 동생으로부터 스타 도전을 받은 걸무고, 과연 그는 저그의 자존심을 지켜낼 수 있을 것인가? 5월 1일. Python 개봉 박두",
      audienceAge: 15,
    },
    {
      pk: 3,
      title: "박물관이 살아있다 : Walking Moving Museum",
      runtime: 8,
      rate: 1.2,
      imgPath: "https://images.justwatch.com/poster/8733916/s592/bagmulgwani-salaissda.webp",
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
    },
  ],
  effects_UNSTABLE: [persistAtom],
});
