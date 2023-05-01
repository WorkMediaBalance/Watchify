import React, { useEffect } from "react";

type Props = { tab: number };

const RecList = ({ tab }: Props) => {
  useEffect(() => {
    if (tab === 2) {
      // console.log(tab);
    }
  }, [tab]);
  return <div>추천목록</div>;
};

export default RecList;
