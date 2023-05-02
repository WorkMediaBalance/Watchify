import React, { useRef, useState } from "react";
import styled from "styled-components";
// import { getBasicInfoApi, putProfileImgApi } from "apis/apiForMyPage";
import { AiFillCamera, AiOutlineCheckCircle } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // height: 18vh;
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
  font-size: ${({ theme }) => theme.fontSizeType.medium};
  font-weight: ${({ theme }) => theme.fontSizeType.medium};
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
  const [inputName, setInputName] = useState(""); //TODO: 기본값을 받아온 UserName으로
  const [isNameInput, setIsNameInput] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value && e.target.value.length > 10) {
      alert("닉네임은 10자 이내로 작성해주세요.");
    } else {
      setInputName(e.target.value);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // changeName();
    }
  };

  return (
    <ProfileContainer>
      <PhotoAndChange>
        <PhotoContainer>
          <Photo src={"http://via.placeholder.com/132x84"} alt="profileImage" />
          <ChangePhotoButton>
            <AiFillCamera />
          </ChangePhotoButton>
        </PhotoContainer>
        <ChangePhotoInput
        // type="file"
        // accept={"image/*"}
        // onChange={changePhoto}
        // ref={imgRef}
        />
      </PhotoAndChange>
      <UserNameAndChangeButtonContainer>
        {!isNameInput ? (
          <UserName>사용자 이름</UserName>
        ) : (
          <UserNameModiyInput onChange={onChange} onKeyDown={onKeyDown} />
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
            <AiOutlineCheckCircle
              size={20}
              // onClick={() => changeName();}
            />
            <RxCrossCircled
              size={20}
              onClick={() => {
                setIsNameInput(false);
                setInputName(""); //TODO: 여기 나중에 사용자 이름으로 초기화 해주기
              }}
            />
          </UserNameChangeButton>
        )}
      </UserNameAndChangeButtonContainer>
    </ProfileContainer>
  );
};

export default Profile;
