import React, { useState } from "react";
import styled from "styled-components";

import WatchingPattern from "components/common/WatchingPattern";
import OttSubscription from "components/common/OttSubscription";

import OttModal from "components/common/OttModal";

const PageSchedule = () => {
  const [showOttModal, setShowOttModal] = useState<boolean>(false);

  const onClickShowOttModal = () => {
    setShowOttModal(!showOttModal);
  };
  return (
    <Container>
      <WatchingPattern />
      <OttSubscription />
    </Container>
  );
};

export default PageSchedule;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  color: white;
`;
