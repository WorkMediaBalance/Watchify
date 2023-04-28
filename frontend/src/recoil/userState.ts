import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import OttSubscription from "./../components/common/OttSubscription";

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

// 민혁 추가 (ott 구독 여부)
type Subscription = {
  name: string;
  img: string;
  subscriptionDate: string;
};

export const ottSubscriptionState = atom<Subscription[]>({
  key: "ottSubscriptionState",
  default: [
    {
      name: "netflix",
      img: "https://cdn.eyesmag.com/content/uploads/posts/2021/12/10/Netflix-launches-website-Tudum-main-3402edc0-22ef-4394-804e-c4ce28015507.jpg",
      subscriptionDate: "2022-04-28",
    },
    {
      name: "disney",
      img: "https://t1.daumcdn.net/cfile/tistory/991B4D485ED7124007",
      subscriptionDate: "2022-02-19",
    },
  ],
});
