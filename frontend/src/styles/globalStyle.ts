import { createGlobalStyle } from "styled-components";
import { theme } from "styles/theme";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${theme.fontFamily};
  }
`;

export default GlobalStyle;
