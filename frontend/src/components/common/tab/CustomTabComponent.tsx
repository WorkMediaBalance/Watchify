import React, { useState } from "react";
import styled from "styled-components";

import TabListItemContainer from "./TabListItemContainer";
import DisplayContainer from "./DisplayContainer";

interface CustomTabComponentProps {
  titleArray: Array<string>;
  componentArray: Array<React.ComponentType>;
  width: string;
  minHeight: string;
}

const CustomTabComponent: React.FC<CustomTabComponentProps> = ({
  titleArray,
  componentArray,
  width,
  minHeight,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const arrayLength = titleArray.length;
  return (
    <div style={{ width: width }}>
      <TabListItemContainerWrapper>
        <TabListItemContainer
          titleArray={titleArray}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          arrayLength={arrayLength}
        ></TabListItemContainer>
      </TabListItemContainerWrapper>
      <DisplayWrapper>
        <DisplayContainer
          componentArray={componentArray}
          currentIndex={currentIndex}
          minHeight={minHeight}
        ></DisplayContainer>
      </DisplayWrapper>
    </div>
  );
};

export default CustomTabComponent;

const TabListItemContainerWrapper = styled.div`
  flex-shrink: 0;
  margin-top: 20vh; // TODO 이거 변수화
`;

const DisplayWrapper = styled.div`
  position: relative;
  flex: 1;
  overflow-y: auto;
  top: 3vh; // TODO : 이거 변수화
  height: 66vh;
`;
