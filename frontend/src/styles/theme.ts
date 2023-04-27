import { DefaultTheme } from "styled-components";

export interface Theme extends DefaultTheme {
  netflix: {
    pointColor: string;
    backgroundColor: string;
    fontColor: string;
    tabColor: string;
  };
  watcha: {};
  disney: {};
  wavve: {};
  fontFamily: string;
}

export const theme: Theme = {
  netflix: {
    pointColor: "#E50914",
    backgroundColor: "#232323",
    fontColor: "#FFFFFF",
    tabColor: "#181818",
  },
  watcha: {},
  disney: {},
  wavve: {},
  fontFamily: "Arial, sans-serif",
};
