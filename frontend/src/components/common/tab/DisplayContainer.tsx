import React from "react";

interface DisplayContainerProps {
  componentArray: Array<React.ComponentType>;
  currentIndex: number;
  minHeight: string;
}

const DisplayContainer: React.FC<DisplayContainerProps> = ({
  componentArray,
  currentIndex,
  minHeight,
}) => {
  const CurrentComponent = componentArray[currentIndex];
  return (
    <div style={{ minHeight: minHeight }}>
      <CurrentComponent />
    </div>
  );
};

export default DisplayContainer;
