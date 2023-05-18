import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { schedule, ScheduleAll } from "interface/schedule";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
});

export const weekScheduleState = atom<schedule>({
  key: "weekScheduleState",
  default: {},
});

export const monthScheduleState = atom<schedule>({
  key: "monthScheduleState",
  default: {},
});

export const scheduleAllState = atom<ScheduleAll>({
  key: "scheduleAllState",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
