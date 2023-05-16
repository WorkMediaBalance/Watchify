import { content } from "./content";

interface scheduleContent extends content {
  episode: number;
  date: string;
  view: boolean;
}
export interface schedule {
  [key: number]: scheduleContent[];
}

export interface ScheduleAll {
  [key: string]: schedule;
}
