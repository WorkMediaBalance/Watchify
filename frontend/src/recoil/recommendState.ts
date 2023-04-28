import { atom } from "recoil";

export const recGenreState = atom<Array<string>>({
  key: "recGenreState",
  default: [],
});
