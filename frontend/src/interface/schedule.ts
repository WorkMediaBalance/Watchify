import { content } from "./content";

export interface schedule {
  [key: number]: content[];
}

export interface ScheduleAll {
  [key: string]: schedule;
}
