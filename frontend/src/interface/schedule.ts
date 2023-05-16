import { content } from "./content";

export interface schedule {
  [key: number]: content[];
}

export interface schedulePreInfo {
  startDate: string | undefined;
  contents: number[];
  patterns: number[];
  ott: string[];
}

export interface ScheduleAll {
  [key: string]: schedule;
}
