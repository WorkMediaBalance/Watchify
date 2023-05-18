import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { schedulePreInfo } from "interface/schedule";
import { content } from "interface/content";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
});

export const schedulePreInfoState = atom<schedulePreInfo>({
  key: "schedulePreInfoState",
  default: {
    startDate: "",
    contents: [],
    patterns: [],
    ott: [],
  },
  effects_UNSTABLE: [persistAtom],
});
