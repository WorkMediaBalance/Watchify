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
  color: ${({ isSelected }) => (isSelected ? "red" : "white")};
  display: flex;
  justify-content: center;
  align-items: center;
`;
