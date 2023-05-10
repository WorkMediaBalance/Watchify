import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";

const Bar = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 5vh;
  background-color: ${({ theme }) => theme.netflix.tabColor};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.netflix.fontColor};
`;

const TitleHolder = styled.div`
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.fontSizeType.middle};
`;

interface AppBarProps {
  title?: string;
}

const AppBar: React.FC<AppBarProps> = ({ title }) => {
  let navigate = useNavigate();
  return (
    <div style={{ zIndex: "10000", position: "sticky" }} id="app-bar">
      <Bar>
        <AiOutlineLeft onClick={() => navigate(-1)} style={{ marginLeft: "2vw" }} />
        <TitleHolder>{title}</TitleHolder>
        <AiOutlineRight style={{ visibility: "hidden", marginRight: "2vw" }} />
      </Bar>
    </div>
  );
};

export default AppBar;
