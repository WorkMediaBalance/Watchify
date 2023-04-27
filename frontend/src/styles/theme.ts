import { DefaultTheme } from "styled-components";

export interface Theme extends DefaultTheme {
  netflix: {
    pointColor: string;
    backgroundColor: string;
    fontColor: string;
    tabColor: string;
  };
  watcha: { pointColor: string; backgroundColor: string; fontColor: string; tabColor: string };
  disney: { pointColor: string; backgroundColor: string; fontColor: string; tabColor: string };
  wavve: { pointColor: string; backgroundColor: string; fontColor: string; tabColor: string };
  fontFamily: string;
}

export const theme: Theme = {
  netflix: {
    pointColor: "#E50914",
    backgroundColor: "#232323",
    fontColor: "#FFFFFF",
    tabColor: "#181818",
  },
  watcha: {
    pointColor: "#E50914",
    backgroundColor: "#232323",
    fontColor: "#FFFFFF",
    tabColor: "#181818",
  },
  disney: {
    pointColor: "#E50914",
    backgroundColor: "#232323",
    fontColor: "#FFFFFF",
    tabColor: "#181818",
  },
  wavve: {
    pointColor: "#E50914",
    backgroundColor: "#232323",
    fontColor: "#FFFFFF",
    tabColor: "#181818",
  },
  fontFamily: "Arial, sans-serif",
};
