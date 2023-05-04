import React, { useState } from "react";
import styled from "styled-components";

import WatchingPattern from "components/common/WatchingPattern";
import OttSubscription from "components/common/OttSubscription";

const PageSchedule = () => {
  return (
    <Container>
      <WatchingPattern />
      <OttSubscription />
    </Container>
  );
};

export default PageSchedule;

const Container = styled.div`
  height: 95.4vh;
  display: flex;
  flex-direction: column;
  color: white;
  margin-top: 10vw;
`;
