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
type Subscription = {
  name: string;
  subscriptionDate: string;
};

export const ottSubscriptionState = atom<Subscription[]>({
  key: "ottSubscriptionState",
  default: [
    {
      name: "netflix",
      subscriptionDate: "2022-04-28",
    },
    {
      name: "disney",
      subscriptionDate: "2022-02-19",
    },
  ],
  // effects_UNSTABLE: [persistAtom],
});

// 찜 목록
export const essListState = atom<content[]>({
  key: "essListState",
  default: [
    {
      pk: 1,
      title: "박물관이 살아있다 : Walking Moving Museum",
      runtime: 8,
      rate: 1.2,
      img_path: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      backdrop_path: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      isLike: 1,
      type: "드라마",
      season: 1,
      finalEpisode: 1,
      ott: ["wavve"],
      genres: ["박물관", "리얼리티"],
      isWish: false,
      isLike: 0,
      summarize:
        "한참 어린 동생으로부터 스타 도전을 받은 걸무고, 과연 그는 저그의 자존심을 지켜낼 수 있을 것인가? 5월 1일. Python 개봉 박두",
      audienceAge: 15,
    },
    {
      pk: 2,
      title: "트와일라잇",
      runtime: 60,
      rate: 3.7,
      img_path: "https://images.justwatch.com/poster/129382738/s592/twilight.webp",
      backdrop_path: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      isLike: 1,
      type: "영화",
      season: 1,
      finalEpisode: 1,
      ott: ["wavve"],
      genres: ["박물관", "리얼리티"],
      isWish: false,
      isLike: 0,
      summarize:
        "한참 어린 동생으로부터 스타 도전을 받은 걸무고, 과연 그는 저그의 자존심을 지켜낼 수 있을 것인가? 5월 1일. Python 개봉 박두",
      audienceAge: 15,
    },
  ],
});

export const wishListState = atom<content[]>({
  key: "wishListState",
  default: [
    {
      pk: 12321,
      title: "박물관이 살아있다 : Walking Moving Museum",
      runtime: 8,
      rate: 1.2,
      img_path: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      backdrop_path: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      isLike: 1,
      type: "드라마",
      season: 1,
      finalEpisode: 1,
      ott: ["wavve"],
      genres: ["박물관", "리얼리티"],
      isWish: false,
      isLike: 0,
      summarize:
        "한참 어린 동생으로부터 스타 도전을 받은 걸무고, 과연 그는 저그의 자존심을 지켜낼 수 있을 것인가? 5월 1일. Python 개봉 박두",
      audienceAge: 15,
    },
    {
      pk: 2,
      title: "트와일라잇",
      runtime: 60,
      rate: 3.7,
      img_path: "https://images.justwatch.com/poster/129382738/s592/twilight.webp",
      backdrop_path: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      isLike: 1,
      type: "영화",
      season: 1,
      finalEpisode: 1,
      ott: ["wavve"],
      genres: ["박물관", "리얼리티"],
      isWish: false,
      isLike: 0,
      summarize:
        "한참 어린 동생으로부터 스타 도전을 받은 걸무고, 과연 그는 저그의 자존심을 지켜낼 수 있을 것인가? 5월 1일. Python 개봉 박두",
      audienceAge: 15,
    },
    {
      pk: 3,
      title: "박물관이 살아있다 : Walking Moving Museum",
      runtime: 8,
      rate: 1.2,
      img_path: "https://images.justwatch.com/poster/8733916/s592/bagmulgwani-salaissda.webp",
      backdrop_path: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      isLike: 1,
      type: "영화",
      season: 1,
      finalEpisode: 1,
      ott: ["wavve"],
      genres: ["박물관", "리얼리티"],
      isWish: false,
      isLike: 0,
      summarize:
        "한참 어린 동생으로부터 스타 도전을 받은 걸무고, 과연 그는 저그의 자존심을 지켜낼 수 있을 것인가? 5월 1일. Python 개봉 박두",
      audienceAge: 15,
    },
    {
      pk: 4,
      title: "박물관이 살아있다 : Walking Moving Museum",
      runtime: 8,
      rate: 1.2,
      img_path: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      backdrop_path: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      isLike: 1,
      type: "영화",
      season: 1,
      finalEpisode: 1,
      ott: ["wavve"],
      genres: ["박물관", "리얼리티"],
      isWish: false,
      isLike: 0,
      summarize:
        "한참 어린 동생으로부터 스타 도전을 받은 걸무고, 과연 그는 저그의 자존심을 지켜낼 수 있을 것인가? 5월 1일. Python 개봉 박두",
      audienceAge: 15,
    },
    {
      pk: 5,
      title: "박물관이 살아있다 : Walking Moving Museum",
      runtime: 8,
      rate: 1.2,
      img_path: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      backdrop_path: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      isLike: 1,
      type: "영화",
      season: 1,
      finalEpisode: 1,
      ott: ["wavve"],
      genres: ["박물관", "리얼리티"],
      isWish: false,
      isLike: 0,
      summarize:
        "한참 어린 동생으로부터 스타 도전을 받은 걸무고, 과연 그는 저그의 자존심을 지켜낼 수 있을 것인가? 5월 1일. Python 개봉 박두",
      audienceAge: 15,
    },
    {
      pk: 6,
      title: "박물관이 살아있다 : Walking Moving Museum",
      runtime: 8,
      rate: 1.2,
      img_path: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      backdrop_path: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      isLike: 1,
      type: "영화",
      season: 1,
      finalEpisode: 1,
      ott: ["wavve"],
      genres: ["박물관", "리얼리티"],
      isWish: false,
      isLike: 0,
      summarize:
        "한참 어린 동생으로부터 스타 도전을 받은 걸무고, 과연 그는 저그의 자존심을 지켜낼 수 있을 것인가? 5월 1일. Python 개봉 박두",
      audienceAge: 15,
    },
    {
      pk: 7,
      title: "박물관이 살아있다 : Walking Moving Museum",
      runtime: 8,
      rate: 1.2,
      img_path: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      backdrop_path: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      isLike: 1,
      type: "영화",
      season: 1,
      finalEpisode: 1,
      ott: ["wavve"],
      genres: ["박물관", "리얼리티"],
      isWish: false,
      isLike: 0,
      summarize:
        "한참 어린 동생으로부터 스타 도전을 받은 걸무고, 과연 그는 저그의 자존심을 지켜낼 수 있을 것인가? 5월 1일. Python 개봉 박두",
      audienceAge: 15,
    },
    {
      pk: 8,
      title: "박물관이 살아있다 : Walking Moving Museum",
      runtime: 8,
      rate: 1.2,
      img_path: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      backdrop_path: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      isLike: 1,
      type: "영화",
      season: 1,
      finalEpisode: 1,
      ott: ["wavve"],
      genres: ["박물관", "리얼리티"],
      isWish: false,
      isLike: 0,
      summarize:
        "한참 어린 동생으로부터 스타 도전을 받은 걸무고, 과연 그는 저그의 자존심을 지켜낼 수 있을 것인가? 5월 1일. Python 개봉 박두",
      audienceAge: 15,
    },
  ],
  effects_UNSTABLE: [persistAtom],
});
