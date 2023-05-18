import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { content } from "interface/content";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
});

export const recListState = atom<content[]>({
  key: "recListState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
