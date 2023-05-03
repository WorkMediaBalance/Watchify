// GreenDot.tsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BsCalendarWeek } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { MdOutlineRecommend } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";

const BottomBar = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 4vh;
  background-color: ${({ theme }) => theme.netflix.tabColor};
  margin: 0;
  z-index: 10;
`;

const DotContainer = styled.span`
  position: fixed;
  bottom: 0; // 하단에서의 간격 설정
  width: 100vw;
  z-index: 20;
`;

const OuterDot = styled.span`
  position: relative;
  display: inline-block;
  width: 15vw;
  height: 15vw;
  background-color: ${({ theme }) => theme.netflix.pointColor};
  border-radius: 50%;
  left: 50%;
  transform: translate(-50%);
  z-index: 30;
`;

const InnerDot = styled.span<{ size: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  background-color: ${({ theme }) => theme.netflix.tabColor};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s; // 크기 변경 시 애니메이션 적용
  z-index: 40;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-170%, -100%);
  z-index: 10;
  color
  // display:flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
`;

const SemiCircle = styled.span<{
  rotated: boolean;
  rotateAngle: string[];
  tabIdx: boolean;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50vw;
  height: 25vw;
  background-color: ${(props) =>
    props.tabIdx
      ? props.theme.netflix.pointColor
      : props.theme.netflix.tabColor};
  border-radius: 25vw 25vw 0 0;
  clip-path: polygon(
    50% 100%,
    0 0,
    50% 0
  ); // 이게 45도짜리 부채꼴 -> 5번째에 있는 50%의 수치를 조절해서 각도 조절
  transform: translate(-50%, -100%)
    rotate(
      ${(props) =>
        props.rotated ? props.rotateAngle[0] : props.rotateAngle[1]}
    );
  // transform: translate(-50%, -100%) rotate(45deg);
  transform-origin: 50% 25vw;
  transition: transform 0.3s, opacity 0.3s;
  opacity: ${(props) => (props.rotated ? 0 : 1)};
  z-index: 5;
  // transition: transform 0.3s;
`;

// icons
const StyledBiSearchAlt2 = styled(BiSearchAlt2)`
  transform: rotate(45deg);
  font-size: 5vw;
  color: ${({ theme }) => theme.netflix.fontColor};
`;
const StyledMdOutlineRecommend = styled(MdOutlineRecommend)`
  transform: rotate(0deg);
  font-size: 5vw;
  color: ${({ theme }) => theme.netflix.fontColor};
`;
const StyledBsCalendarWeek = styled(BsCalendarWeek)`
  transform: rotate(-45deg);
  font-size: 5vw;
  color: ${({ theme }) => theme.netflix.fontColor};
`;
const StyledCgProfile = styled(CgProfile)`
  transform: rotate(-90deg);
  font-size: 5vw;
  color: ${({ theme }) => theme.netflix.fontColor};
`;

interface BottomDotProps {
  isSemiCircleRotated: boolean;
  setIsSemiCircleRotated: React.Dispatch<React.SetStateAction<boolean>>;
  innerDotSize: string;
  setInnerDotSize: React.Dispatch<React.SetStateAction<string>>;
  toggleInnerDotSize: () => void;
}

const BottomDot: React.FC<BottomDotProps> = ({
  isSemiCircleRotated,
  setIsSemiCircleRotated,
  innerDotSize,
  setInnerDotSize,
  toggleInnerDotSize,
}) => {
  const [isClicked, setIsClicked] = useState(0);

  let navigate = useNavigate();

  const clickTabHandler = (tabIdx: number) => {
    setIsClicked(tabIdx);
  };
  const iconStyle = { fontSize: "5vw", color: "white" };
  const iconArray = [
    <></>,
    <BiSearchAlt2 style={iconStyle} />,
    <MdOutlineRecommend style={iconStyle} />,
    <BsCalendarWeek style={iconStyle} />,
    <CgProfile style={iconStyle} />,
  ];

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case "/search":
        clickTabHandler(1);
        break;
      case "/recommend":
        clickTabHandler(2);
        break;
      case "/schedule":
        clickTabHandler(3);
        break;
      case "/my":
        clickTabHandler(4);
        break;
      default:
        clickTabHandler(0);
    }
  }, [location]);

  return (
    <div>
      <DotContainer>
        <OuterDot onClick={toggleInnerDotSize}>
          <InnerDot size={innerDotSize}>
            {!isSemiCircleRotated && iconArray[isClicked]}
          </InnerDot>
        </OuterDot>
        <SemiCircle
          onClick={() => {
            clickTabHandler(1);
            navigate("/search");
            toggleInnerDotSize();
          }}
          rotated={isSemiCircleRotated}
          rotateAngle={["-90deg", "-45deg"]}
          tabIdx={isClicked === 1}
        >
          <IconWrapper>
            <StyledBiSearchAlt2 />
          </IconWrapper>
        </SemiCircle>
        <SemiCircle
          onClick={() => {
            clickTabHandler(2);
            navigate("/recommend");
            toggleInnerDotSize();
          }}
          rotated={isSemiCircleRotated}
          rotateAngle={["-45deg", "0deg"]}
          tabIdx={isClicked === 2}
        >
          <IconWrapper>
            <StyledMdOutlineRecommend />
          </IconWrapper>
        </SemiCircle>
        <SemiCircle
          onClick={() => {
            clickTabHandler(3);
            navigate("/schedule");
            toggleInnerDotSize();
          }}
          rotated={isSemiCircleRotated}
          rotateAngle={["0deg", "45deg"]}
          tabIdx={isClicked === 3}
        >
          <IconWrapper>
            <StyledBsCalendarWeek />
          </IconWrapper>
        </SemiCircle>
        <SemiCircle
          onClick={() => {
            clickTabHandler(4);
            navigate("/my");
            toggleInnerDotSize();
          }}
          rotated={isSemiCircleRotated}
          rotateAngle={["45deg", "90deg"]}
          tabIdx={isClicked === 4}
        >
          <IconWrapper>
            <StyledCgProfile />
          </IconWrapper>
        </SemiCircle>
        <BottomBar />
      </DotContainer>
    </div>
  );
};

export default BottomDot;
