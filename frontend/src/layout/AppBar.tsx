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
  background-color: #000000;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

const TitleHolder = styled.div``;

interface AppBarProps {
  title?: string;
}

const AppBar: React.FC<AppBarProps> = ({ title }) => {
  let navigate = useNavigate();
  return (
    <div>
      <Bar>
        <AiOutlineLeft
          onClick={() => navigate(-1)}
          style={{ marginLeft: "2vh" }}
        />
        <TitleHolder>{title}</TitleHolder>
        <AiOutlineRight style={{ visibility: "hidden", marginRight: "2vh" }} />
      </Bar>
    </div>
  );
};

export default AppBar;
