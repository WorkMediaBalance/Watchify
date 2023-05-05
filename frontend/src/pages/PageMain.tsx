import React, { useState } from "react";
import Carousel from "../components/common/Carousel";
import TodayWatch from "components/main/TodayWatch";

const PageMain = () => {
  const [clickState, setClickState] = useState(0);
  const [prevState, setPrevState] = useState(0);
  const handleState = async (index: number) => {
    await setPrevState(clickState);
    await setClickState(index);
  };
  return (
    <div>
      <TodayWatch
        clickState={clickState}
        setClickState={setClickState}
        prevState={prevState}
        setPrevState={setPrevState}
      ></TodayWatch>
      <div onClick={() => handleState(0)}>
        <Carousel />
      </div>
    </div>
  );
};

export default PageMain;
