import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
});

export const isLoggedInState = atom<boolean>({
  key: "isLoggedInState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const userLevelState = atom<number>({
  key: "userLevelState",
  default: 10,
});

export const userScoreState = atom<number>({
  key: "userScoreState",
  default: 10,
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
type Wish = {
  title: string;
};

export const wishState = atom<Wish[]>({
  key: "wishState",
  default: [
    {
      title: "병진의 췌장을 먹고 싶어",
    },
    {
      title: "4월은 병진의 거짓말",
    },
    {
      title: "꽃보다 병진",
    },
    {
      title: "내 머릿속의 병진",
    },
    {
      title: "재벌집 막내 병진",
    },
    {
      title: "D.P를 좋아하는 병진",
    },
  ],
  // effects_UNSTABLE: [persistAtom],
});
