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
    <Layout>
      {showOttModal ? (
        <OttModal showOttModal={showOttModal} setShowOttModal={setShowOttModal} />
      ) : null}
      <WatchingPattern />

      <OttSubscription
        onClickShowOttModal={onClickShowOttModal}
        showOttModal={showOttModal}
        setShowOttModal={setShowOttModal}
      />
      <div></div>
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
