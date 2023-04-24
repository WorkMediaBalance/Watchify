import React from "react";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { isLoggedInState, userLevelState, userScoreState } from "../recoil/userState";

const RecoilTest = () => {
  // recoil 사용법

  // 1. 값을 구독만 하고 싶을 때 (내가 변경할 필요는 X)
  const userLevel = useRecoilValue(userLevelState);
  // 2. 값을 사용도 하고, 변경도 하고 싶을 때
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  // 3. 값을 변경만 하고 싶을 때
  const setUserScore = useSetRecoilState(userScoreState);
  const userScore = useRecoilValue(userScoreState); // 원래 얘는 필요 없는거임. 그냥 보여주려고 씀

  const changeLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const ChangeUserScore = () => {
    setUserScore(userScore + 10);
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <div>유저 레벨: {userLevel}</div>
      <hr />
      <div>
        {isLoggedIn ? <p>로그인 함</p> : <p>로그인 안함</p>}
        <button onClick={changeLogin}>로그인 여부 변경</button>
      </div>
      <hr />
      <div>
        <p>유저 점수: {userScore}</p>
        <button onClick={ChangeUserScore}>유저 스코어 변경</button>
      </div>
    </div>
  );
};

export default RecoilTest;
