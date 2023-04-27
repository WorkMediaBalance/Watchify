import React from "react";
import styled from "styled-components";

import WatchingPattern from "components/common/WatchingPattern";
import OttSubscription from "components/common/OttSubscription";

const PageSchedule = () => {
  return (
    <Layout>
      <div>상단 navbar 띄울 곳임</div>
      <WatchingPattern />
      <OttSubscription />
    </Layout>
  );
};

export default PageSchedule;

const Layout = styled.div`
  background-color: ${({ theme }) => theme.netflix.backgroundColor};
  color: white;
  text-align: center;
  height: 100vh;
`;
