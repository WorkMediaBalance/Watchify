import React from "react";
import styled from "styled-components";

import Indicator from "./Indicator";
import TabListItem from "./TabListItem";

interface TabListItemContainerProps {
  titleArray: Array<string>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  arrayLength: number;
}

const TabListItemContainer: React.FC<TabListItemContainerProps> = ({
  titleArray,
  currentIndex,
  setCurrentIndex,
  arrayLength,
}) => {
  return (
    <div style={{ position: "fixed", width: "100%" }}>
      <Container>
        {titleArray.map((title, index) => {
          return (
            <TabListItem
              title={title}
              index={index}
              currentIndex={currentIndex}
              arrayLength={arrayLength}
              setCurrentIndex={setCurrentIndex}
            ></TabListItem>
          );
        })}
      </Container>
      <Indicator currentIndex={currentIndex} arrayLength={arrayLength} />
    </div>
  );
};

export default TabListItemContainer;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;
