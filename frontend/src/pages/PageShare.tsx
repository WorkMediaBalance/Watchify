import React, { useEffect } from "react";
import { shareKakao } from "hooks/shareKakaoLink";

const PageShare = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const sharing = (name: string) => {
    shareKakao("https://k8a207.p.ssafy.io", `${name}님의 OTT 시청 패턴이 궁금하다면?`);
  };

  return (
    <div>
      <img
        src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
        alt="#"
        onClick={() => {
          sharing("박용찬");
        }}
      />
    </div>
  );
};

export default PageShare;
