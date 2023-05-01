import React, { useEffect } from "react";

type Props = { tab: number };

const WishList = ({ tab }: Props) => {
  useEffect(() => {
    if (tab === 1) {
      //   console.log(tab);
    }
  }, [tab]);
  return <div>찜목록</div>;
};

export default WishList;
