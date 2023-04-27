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
