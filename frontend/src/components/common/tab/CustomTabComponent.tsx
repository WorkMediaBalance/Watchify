import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useRecoilState } from "recoil";
import { tabState } from "recoil/tabState";

import TabListItemContainer from "./TabListItemContainer";
import DisplayContainer from "./DisplayContainer";

interface CustomTabComponentProps {
  titleArray: Array<string>;
  componentArray: Array<React.ComponentType>;
  width: string;
  minHeight: string;
  marginTop: string;
  top: string;
}

const CustomTabComponent: React.FC<CustomTabComponentProps> = ({
  titleArray,
  componentArray,
  width,
  minHeight,
  marginTop,
  top,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tab, setTab] = useRecoilState(tabState);

  useEffect(() => {
    setTab(currentIndex);
  }, [currentIndex]);

  const arrayLength = titleArray.length;
  return (
    <div>
      <TabListItemContainerWrapper marginTop={marginTop}>
        <TabListItemContainer
          titleArray={titleArray}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          arrayLength={arrayLength}
        ></TabListItemContainer>
      </TabListItemContainerWrapper>
      <DisplayWrapper top={top}>
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

const TabListItemContainerWrapper = styled.div<{ marginTop: string }>`
  flex-shrink: 0;
  margin-top: ${(props) => props.marginTop};
`;

const DisplayWrapper = styled.div<{ top: string }>`
  position: relative;
  flex: 1;
  overflow-y: auto;
  top: ${(props) => props.top};
  height: 66vh;
`;
