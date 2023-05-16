import React from "react";
import styled from "styled-components";

interface TabListItemProps {
  title: String;
  index: number;
  currentIndex: number;
  arrayLength: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const TabListItem: React.FC<TabListItemProps> = ({
  title,
  index,
  currentIndex,
  arrayLength,
  setCurrentIndex,
}) => {
  const isSelected = index === currentIndex;
  return (
    <Title
      onClick={() => {
        setCurrentIndex(index);
      }}
      isSelected={isSelected}
      arrayLength={arrayLength}
    >
      {title}
    </Title>
  );
};

export default TabListItem;

const Title = styled.div<{
  isSelected: boolean;
  arrayLength: number;
}>`
  width: ${({ arrayLength }) => 100 / arrayLength}%;
  color: ${({ isSelected, theme }) => (isSelected ? theme.netflix.lightColor : "grey")};
  font-weight: ${({ isSelected, theme }) => (isSelected ? "800" : "600")};
  margin-bottom: 0.6vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;
