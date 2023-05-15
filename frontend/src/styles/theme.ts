import { DefaultTheme } from "styled-components";

// ${({ theme }) => theme.netflix.tabColor}
export interface Theme {
  netflix: {
    pointColor: string;
    backgroundColor: string;
    lightColor: string;
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
    pointColor: "#FF5500",
    lightColor: "#F08C5A",
    backgroundColor: "#151515",
    fontColor: "#FFFFFF",
    tabColor: "#1B1B1B",
  },
  // netflix: { 청록색
  //   pointColor: "#00DFA1",
  //   backgroundColor: "#000100",
  //   fontColor: "#FFFFFF",
  //   tabColor: "#1A1A1A",
  // },
  // netflix: { 빨강색
  //   pointColor: "#F21E2E",
  //   backgroundColor: "#141416",
  //   fontColor: "#FFFFFF",
  //   tabColor: "#272729",
  // },
  // netflix: { 보라색
  //   pointColor: "#8646D9",
  //   backgroundColor: "#030018",
  //   fontColor: "#FFFFFF",
  //   tabColor: "#100C23",
  // },
  // netflix: { 분홍색
  //   pointColor: "#E42A53",
  //   backgroundColor: "#151726",
  //   fontColor: "#FFFFFF",
  //   tabColor: "#181F39",
  // },
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
      fontSize: "5vw",
      fontWeight: "600",
    },
    middle: {
      fontSize: "3.5vw",
      fontWeight: "500",
    },
    small: {
      fontSize: "2vw",
      fontWeight: "400",
    },
  },
};
