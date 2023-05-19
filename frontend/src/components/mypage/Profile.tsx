import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// import { getBasicInfoApi, putProfileImgApi } from "apis/apiForMyPage";
import { AiFillCamera, AiOutlineCheckCircle } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";

import { useRecoilState } from "recoil";
import { userState } from "recoil/userState";

import { myProfileName, myProfileImg, mybasicInfo } from "apis/apiMy";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 20vh;
`;

const PhotoAndChange = styled.div`
  position: relative;
  margin-top: 3vh;
  margin-bottom: 1vh;
`;

const PhotoContainer = styled.div`
  width: 25vw;
  height: 25vw;
  border-radius: 70%;
  overflow: hidden;
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ChangePhotoButton = styled.div`
  position: absolute;
  color: ${({ theme }) => theme.netflix.fontColor};
  top: 80%;
  left: 80%;
  width: 5vw;
  height: 5vw;
`;

const ChangePhotoInput = styled.input`
  display: none;
`;

const UserNameAndChangeButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const UserName = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.middle};
  font-weight: ${({ theme }) => theme.fontSizeType.middle};
  color: ${({ theme }) => theme.netflix.fontColor};
  text-align: center;
  display: inline;
`;

const UserNameModiyInput = styled.input`
  border: none;
  background: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.netflix.fontColor};
  outline: none;
  color: ${({ theme }) => theme.netflix.fontColor};
`;

const UserNameChangeButton = styled.div`
  margin-left: 0.3rem;
  color: ${({ theme }) => theme.netflix.fontColor};
`;

const Profile = () => {
  const imgRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useRecoilState(userState);
  const [inputName, setInputName] = useState<string>(user.name); //TODO: 기본값을 받아온 UserName으로
  const [isNameInput, setIsNameInput] = useState(false);

  useEffect(() => {}, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value && e.target.value.length > 10) {
      alert("닉네임은 10자 이내로 작성해주세요."); //TODO: axios 보낼때도 한번 더 막아야함
    } else {
      setInputName(e.target.value);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      changeName(inputName);
    }
  };

  // 닉네임 수정 API
  async function changeName(changedName: string) {
    const data = {
      nickName: changedName,
    };

    myProfileName(data);
    // 정상작동하나 로직상 완벽하지 않아서 추후 수정 예정
    let copy = { ...user, name: data.nickName };
    setUser(copy);
    setIsNameInput(false);
  }

  const changePhoto = async function (event: React.ChangeEvent<HTMLInputElement>) {
    if (imgRef.current && imgRef.current.files) {
      const file = imgRef.current.files[0];
      const result = await myProfileImg(file);
      if (result) {
        const newUserInfo = await mybasicInfo();
        setUser(newUserInfo);
      }
    }
  };

  return (
    <div style={{ position: "fixed", width: "100vw" }}>
      <ProfileContainer>
        <PhotoAndChange>
          <PhotoContainer>
            <label htmlFor="photoChange">
              <Photo src={user.imgPath} alt="profileImage" />
              <ChangePhotoButton>
                <AiFillCamera />
              </ChangePhotoButton>
            </label>
          </PhotoContainer>

          <ChangePhotoInput
            id="photoChange"
            type="file"
            accept={"image/*"}
            onChange={changePhoto}
            ref={imgRef}
          ></ChangePhotoInput>
        </PhotoAndChange>
        <UserNameAndChangeButtonContainer>
          {!isNameInput ? (
            <UserName>{user.name}</UserName>
          ) : (
            <UserNameModiyInput onChange={onChange} onKeyDown={onKeyDown} value={inputName} />
          )}
          {!isNameInput ? (
            <UserNameChangeButton>
              <BsPencil
                onClick={() => {
                  setIsNameInput(true);
                }}
              />
            </UserNameChangeButton>
          ) : (
            <UserNameChangeButton>
              <AiOutlineCheckCircle size={20} onClick={() => changeName(inputName)} />
              <RxCrossCircled
                size={20}
                onClick={() => {
                  setIsNameInput(false);
                  setInputName(inputName); //TODO: 여기 나중에 사용자 이름으로 초기화 해주기
                }}
              />
            </UserNameChangeButton>
          )}
        </UserNameAndChangeButtonContainer>
      </ProfileContainer>
    </div>
  );
};
export default Profile;
