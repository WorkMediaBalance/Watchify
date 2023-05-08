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
      title: "더 글로리",
      runtime: 50,
      rate: 4.5,
      img_path: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      type: "드라마",
      season: 1,
      finalEpisode: 10,
      ott: ["netflix"],
      genres: ["드라마"],
      isWish: false,
      summarize:
        "어느 날 길을 걷던 걸무고는 우연히 알 수 없는 동전을 줍게 되고, 이 동전의 충격적인 정체가 알려지며 사건에 휩싸이게 되는데... 과연 걸무고는 무사할 수 있을까?",
      audienceAge: 15,
    },
    {
      pk: 2,
      title: "트와일라잇",
      runtime: 60,
      rate: 3.7,
      img_path: "https://images.justwatch.com/poster/129382738/s592/twilight.webp",
      type: "영화",
      season: 0,
      finalEpisode: 0,
      ott: ["wavve", "watcha"],
      genres: ["야생", "뱀파이어"],
      isWish: true,
      summarize: "뱀파이어가 울부지저따. 뱀파이어는 짱 쎄따. 크와아앙",
      audienceAge: 15,
    },
  ],
});

export const wishListState = atom<content[]>({
  key: "wishListState",
  default: [
    {
      pk: 12321,
      title: "더 글로리",
      runtime: 50,
      rate: 4.5,
      img_path: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      type: "드라마",
      season: 1,
      finalEpisode: 10,
      ott: ["netflix"],
      genres: ["드라마"],
      isWish: false,
      summarize:
        "어느 날 길을 걷던 걸무고는 우연히 알 수 없는 동전을 줍게 되고, 이 동전의 충격적인 정체가 알려지며 사건에 휩싸이게 되는데... 과연 걸무고는 무사할 수 있을까?",
      audienceAge: 15,
    },
    {
      pk: 2,
      title: "트와일라잇",
      runtime: 60,
      rate: 3.7,
      img_path: "https://images.justwatch.com/poster/129382738/s592/twilight.webp",
      type: "영화",
      season: 0,
      finalEpisode: 0,
      ott: ["wavve", "watcha"],
      genres: ["야생", "뱀파이어"],
      isWish: true,
      summarize: "뱀파이어가 울부지저따. 뱀파이어는 짱 쎄따. 크와아앙",
      audienceAge: 15,
    },
    {
      pk: 3,
      title: "고병진이 살아있다 : Walking Moving Byeongjin",
      runtime: 88,
      rate: 1.2,
      img_path: "https://images.justwatch.com/poster/8733916/s592/bagmulgwani-salaissda.webp",
      type: "영화",
      season: 0,
      finalEpisode: 0,
      ott: ["wavve", "netflix", "disney"],
      genres: ["박물관", "리얼리티"],
      isWish: false,
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
      type: "영화",
      season: 1,
      finalEpisode: 1,
      ott: ["wavve"],
      genres: ["박물관", "리얼리티"],
      isWish: false,
      summarize:
        "도전자를 처참히 짓밟아버린 걸무고, 다시 한 번 도전을 받게 되는데... 그는 과연 승리를 다시 한 번 쟁취할 수 있을 것인가..",
      audienceAge: 15,
    },
    {
      pk: 5,
      title: "박물관이 살아있다 : Walking Moving Museum",
      runtime: 8,
      rate: 1.2,
      img_path: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      type: "영화",
      season: 1,
      finalEpisode: 1,
      ott: ["wavve"],
      genres: ["박물관", "리얼리티"],
      isWish: false,
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
      type: "영화",
      season: 1,
      finalEpisode: 1,
      ott: ["wavve"],
      genres: ["박물관", "리얼리티"],
      isWish: false,
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
      type: "영화",
      season: 1,
      finalEpisode: 1,
      ott: ["wavve"],
      genres: ["박물관", "리얼리티"],
      isWish: false,
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
      type: "영화",
      season: 1,
      finalEpisode: 1,
      ott: ["wavve", "netflix", "disney"],
      genres: ["박물관", "리얼리티"],
      isWish: false,
      summarize:
        "한참 어린 동생으로부터 스타 도전을 받은 걸무고, 과연 그는 저그의 자존심을 지켜낼 수 있을 것인가? 5월 1일. Python 개봉 박두",
      audienceAge: 15,
    },
  ],
  effects_UNSTABLE: [persistAtom],
});
