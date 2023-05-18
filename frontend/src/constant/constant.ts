// export const BASE_URL: string = "https://localhost:8080/";
export const BASE_URL: string = "https://k8a207.p.ssafy.io/";

export const MIN_Y = window.innerHeight * 0.1; // 바텀 시트가 최대로 올라 갔을 때의 Y좌표 값
export const MAX_Y = window.innerHeight * 0.55; // 바텀 시트가 최대로 내려갔을 때의 Y좌표 값
export const BOTTOM_SHEET_HEIGHT = window.innerHeight - MIN_Y; // 바텀시트 높이

export const TWO_MIN_Y = window.innerHeight * 0.1; // 바텀 시트가 최대로 올라 갔을 때의 Y좌표 값
export const ONE_MIN_Y = window.innerHeight * 0.4; // 바텀 시트가 최대로 올라 갔을 때의 Y좌표 값
export const TWO_MAX_Y = window.innerHeight * 0.8; // 바텀 시트가 최대로 내려갔을 때의 Y좌표 값
export const TWO_BOTTOM_SHEET_HEIGHT = window.innerHeight - TWO_MIN_Y; // 바텀시트 높이

// 민혁 custom 바텀 시트
export const SCHEDULE_MIN_Y = window.innerHeight * 0.1; // 바텀 시트가 최대로 올라 갔을 때의 Y좌표 값
export const SCHEDULE_MAX_Y = window.innerHeight * 0.7; // 바텀 시트가 최대로 내려갔을 때의 Y좌표 값

export const genres: string[] = [
  "액션",
  "애니메이션",
  "코미디",
  "범죄",
  "다큐멘터리",
  "드라마",
  "판타지",
  "역사",
  "공포",
  "가족",
  "음악",
  "스릴러",
  "로맨스",
  "SF",
  "스포츠",
  "전쟁",
  "서부",
  "Reality TV",
  "Made in Europe",
];

export const USER_NAME: string = "걸무고";

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type OttPeriod = { start: string | null; end: string | null };
export type OttPeriods = {
  [key: string]: OttPeriod;
};

export type Schedule = {
  startDate: string;
  contents: number[];
  parttern: {
    [key: string]: number;
  };
  ott: string[];
};

export type isSeen = { pk: number; episode: number; date: string };

export type ContentRecForm = { isAdult: boolean; ottList: string[]; genres: string[] };

export type later = { date: string; contentId: number; episode: number; newDate: string };
