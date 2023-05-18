import { content } from "./content";

interface scheduleContent extends content {
  episode: number;
  date: string;
  view: boolean;
}
export interface schedule {
  [key: number]: scheduleContent[];
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
export interface SharedScheduleAll {
  [key: string]: schedule;
}
