import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export const tabState = atom<number>({
  key: "tabState",
  default: 0,
});
