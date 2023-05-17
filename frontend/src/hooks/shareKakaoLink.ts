declare global {
  interface Window {
    Kakao: any;
  }
}

export const shareKakao = (route: string, title: string) => {
  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      kakao.init("550d3d612696f258aeadf4582f45b38a");
    }

    kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: title,
        description: "나만의 OTT 스케줄링 서비스 watchify에 접속해보세요!",
        imageUrl: "https://watchify.s3.ap-northeast-2.amazonaws.com/%EC%BA%A1%EC%B2%98.PNG",
        link: {
          mobileWebUrl: route,
          webUrl: route,
        },
      },
      buttons: [
        {
          title: "나도 추천받기",
          link: {
            mobileWebUrl: route,
            webUrl: route,
          },
        },
      ],
    });
  }
};
