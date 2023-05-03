import React, { useEffect } from "react";

type Props = { tab: number };

const Search = ({ tab }: Props) => {
  useEffect(() => {
    if (tab === 3) {
      // console.log(tab);
    }
  }, [tab]);
  return <div>검색</div>;
};

export default Search;
