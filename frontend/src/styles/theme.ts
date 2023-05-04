import { DefaultTheme } from "styled-components";

// ${({ theme }) => theme.netflix.tabColor}
export interface Theme {
  netflix: {
    pointColor: string;
    backgroundColor: string;
    fontColor: string;
    tabColor: string;
  };
  watcha: {
    pointColor: string;
    backgroundColor: string;
    fontColor: string;
    tabColor: string;
  };
  disney: {
    pointColor: string;
    backgroundColor: string;
    fontColor: string;
    tabColor: string;
  };
  wavve: {
    pointColor: string;
    backgroundColor: string;
    fontColor: string;
    tabColor: string;
  };
  fontFamily: string;
  fontSizeType: {
    big: {
      fontSize: string;
      fontWeight: string;
    };
    middle: {
      fontSize: string;
      fontWeight: string;
    };
    small: {
      fontSize: string;
      fontWeight: string;
    };
  };
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
  fontSizeType: {
    big: {
      fontSize: "1.5rem",
      fontWeight: "600",
    },
    middle: {
      fontSize: "1rem",
      fontWeight: "500",
    },
    small: {
      fontSize: "0.8rem",
      fontWeight: "400",
    },
  },
};
