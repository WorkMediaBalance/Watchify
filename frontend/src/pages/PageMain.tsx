import React from "react";
import Carousel from "../components/common/Carousel";
import TodayWatch from "components/main/TodayWatch";

const PageMain = () => {
  return (
    <div>
      <TodayWatch></TodayWatch>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "auto",
          height: "30vh",
          background: `url(https://images.justwatch.com/backdrop/302937718/s1440/mobeomtaegsi.webp) no-repeat center center`,
          backgroundSize: "cover",
          marginBottom: "3vh",
        }}
      ></div> */}
      <Carousel />
    </div>
  );
};

export default PageMain;
