// GreenDot.tsx
import React, { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { BsCalendarWeek } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { MdOutlineRecommend } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";

const BottomBar = styled.div`
  position: relative;
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
  position: absolute;
  bottom: 1vh;
  display: inline-block;
  width: 15vw;
  height: 15vw;

  background-image: ${({ theme }) =>
    `linear-gradient(30deg,  #CB4400, #E94E00, ${theme.netflix.pointColor}, #FF6517, #FF742F , ${theme.netflix.lightColor}, #FFA273)`};
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
  transition: width 1s, height 1s; // 크기 변경 시 애니메이션 적용
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
`;

const SemiCircle = styled(motion.span)<{
  rotated: boolean;
  rotateAngle: string[];
  tabIdx: boolean;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50vw;
  height: 25vw;

  border-radius: 25vw 25vw 0 0;
  clip-path: polygon(
    50% 100%,
    0 0,
    50% 0
  ); // 이게 45도짜리 부채꼴 -> 5번째에 있는 50%의 수치를 조절해서 각도 조절

  background-color: ${(props) =>
    props.tabIdx ? props.theme.netflix.pointColor : props.theme.netflix.tabColor};

  transform-origin: 50% 25vw;

  // opacity: ${(props) => (props.rotated ? 0 : 1)};
  z-index: 5;
`;

// icons
const StyledAiFillHome = styled(AiFillHome)<{ rotate: number }>`
  transform: ${({ rotate }) => `rotate(${(2 - rotate) * 45}deg)`};
  font-size: 5vw;
  color: ${({ theme }) => theme.netflix.fontColor};
`;
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

  const iconStyle = { fontSize: "5vw", color: "white" };
  const iconArray = [
    <></>,
    <BiSearchAlt2 style={iconStyle} />,
    <MdOutlineRecommend style={iconStyle} />,
    <BsCalendarWeek style={iconStyle} />,
    <CgProfile style={iconStyle} />,
  ];

  const location = useLocation();

  const handleClick = async (tabIdx: number) => {
    await setIsClicked(tabIdx);
    toggleInnerDotSize();
  };

  useEffect(() => {
    const path = location.pathname;
    switch (true) {
      case path.startsWith("/search"):
        setIsClicked(1);
        break;
      case path.startsWith("/recommend"):
        setIsClicked(2);
        break;
      case path.startsWith("/schedule"):
        setIsClicked(3);
        break;
      case path.startsWith("/my"):
        setIsClicked(4);
        break;
      default:
        setIsClicked(0);
        break;
    }
  }, [location]);

  const theme = useTheme();

  return (
    <DotContainer id="bottom-dot">
      <OuterDot onClick={toggleInnerDotSize}>
        <InnerDot size={innerDotSize}>{!isSemiCircleRotated && iconArray[isClicked]}</InnerDot>
      </OuterDot>
      <AnimatePresence>
        {!isSemiCircleRotated && (
          <SemiCircle
            initial={{
              transform: `translate(-50%, -27.5vw) rotate(-90deg)`,
            }}
            animate={{
              transform: `translate(-50%, -27.5vw) rotate(-45deg)`,
            }}
            exit={{
              transform: `translate(-50%, -27.5vw) rotate(135deg)`,
            }}
            onClick={() => {
              if (isSemiCircleRotated === false && isClicked !== 1) {
                handleClick(1);
                navigate("/search");
              } else if (isSemiCircleRotated === false && isClicked === 1) {
                handleClick(0);
                navigate("/");
              }
            }}
            rotated={isSemiCircleRotated}
            rotateAngle={["-90deg", "-45deg"]}
            tabIdx={isClicked === 1}
          >
            <IconWrapper>
              {isClicked === 1 ? <StyledAiFillHome rotate={1} /> : <StyledBiSearchAlt2 />}
            </IconWrapper>
          </SemiCircle>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!isSemiCircleRotated && (
          <SemiCircle
            initial={{
              transform: `translate(-50%, -27.5vw) rotate(-90deg)`,
            }}
            animate={{
              transform: `translate(-50%, -27.5vw) rotate(0deg)`,
            }}
            exit={{
              transform: `translate(-50%, -27.5vw) rotate(135deg)`,
            }}
            onClick={() => {
              if (isSemiCircleRotated === false && isClicked !== 2) {
                handleClick(2);
                navigate("/recommend");
              } else if (isSemiCircleRotated === false && isClicked === 2) {
                handleClick(0);
                navigate("/");
              }
            }}
            rotated={isSemiCircleRotated}
            rotateAngle={["-45deg", "0deg"]}
            tabIdx={isClicked === 2}
          >
            <IconWrapper>
              {isClicked === 2 ? <StyledAiFillHome rotate={2} /> : <StyledMdOutlineRecommend />}
            </IconWrapper>
          </SemiCircle>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!isSemiCircleRotated && (
          <SemiCircle
            initial={{
              transform: `translate(-50%, -27.5vw) rotate(-90deg)`,
            }}
            animate={{
              transform: `translate(-50%, -27.5vw) rotate(45deg)`,
            }}
            exit={{
              transform: `translate(-50%, -27.5vw) rotate(135deg)`,
            }}
            onClick={() => {
              if (isSemiCircleRotated === false && isClicked !== 3) {
                handleClick(3);
                navigate("/schedule");
              } else if (isSemiCircleRotated === false && isClicked === 3) {
                handleClick(0);
                navigate("/");
              }
            }}
            rotated={isSemiCircleRotated}
            rotateAngle={["0deg", "45deg"]}
            tabIdx={isClicked === 3}
          >
            <IconWrapper>
              {isClicked === 3 ? <StyledAiFillHome rotate={3} /> : <StyledBsCalendarWeek />}
            </IconWrapper>
          </SemiCircle>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!isSemiCircleRotated && (
          <SemiCircle
            initial={{
              transform: `translate(-50%, -27.5vw) rotate(-90deg)`,
            }}
            animate={{
              transform: `translate(-50%, -27.5vw) rotate(90deg)`,
            }}
            exit={{
              transform: `translate(-50%, -27.5vw) rotate(135deg)`,
            }}
            onClick={() => {
              if (isSemiCircleRotated === false && isClicked !== 4) {
                handleClick(4);
                navigate("/my");
              } else if (isSemiCircleRotated === false && isClicked === 4) {
                handleClick(0);
                navigate("/");
              }
            }}
            rotated={isSemiCircleRotated}
            rotateAngle={["45deg", "90deg"]}
            tabIdx={isClicked === 4}
          >
            <IconWrapper>
              {isClicked === 4 ? <StyledAiFillHome rotate={4} /> : <StyledCgProfile />}
            </IconWrapper>
          </SemiCircle>
        )}
      </AnimatePresence>
      <BottomBar />
    </DotContainer>
  );
};

export default BottomDot;
