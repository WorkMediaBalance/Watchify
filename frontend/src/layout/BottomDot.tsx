// GreenDot.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import {BsCalendarWeek} from 'react-icons/bs'
import {CgProfile} from 'react-icons/cg'
import {MdOutlineRecommend} from 'react-icons/md'
import {BiSearchAlt2} from 'react-icons/bi'


const BottomBar = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 9vw;
  background-color: #000000;
  margin: 0;
  z-index: 10;
`;

const DotContainer = styled.span`
  position: fixed;
  bottom: 0; // 하단에서의 간격 설정
  width : 100vw;
  z-index: 20;
`;

const OuterDot = styled.span`
  position: relative;
  display: inline-block;
  width: 15vw;
  height: 15vw;
  background-color: #E50914;
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
  background-color: #000000;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s; // 크기 변경 시 애니메이션 적용
  z-index: 40;
  display:flex;
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
  // display:flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
`;

const SemiCircle = styled.span<{ rotated: boolean, rotateAngle: string[], tabIdx: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50vw;
  height: 25vw;
  background-color: ${(props) => (props.tabIdx ? '#E50914' : '#000000')};
  border-radius: 25vw 25vw 0 0;
  clip-path: polygon(50% 100%, 0 0, 50% 0); // 이게 45도짜리 부채꼴 -> 5번째에 있는 50%의 수치를 조절해서 각도 조절
  transform: translate(-50%, -100%) rotate(${(props) => (props.rotated ? props.rotateAngle[0] : props.rotateAngle[1])});
  // transform: translate(-50%, -100%) rotate(45deg);
  transform-origin: 50% 25vw;
  transition: transform 0.3s, opacity 0.3s; 
  opacity: ${(props) => (props.rotated ? 0 : 1)}; 
  z-index: 5;
  // transition: transform 0.3s;


 
  
`;







const BottomDot: React.FC = () => {
  const [innerDotSize, setInnerDotSize] = useState('50%');
  const [isSemiCircleRotated, setIsSemiCircleRotated] = useState(false);
  const [isClicked, setIsClicked] = useState(0);

  const toggleInnerDotSize = () => {
    console.log('clicked');
    if (innerDotSize === '60%') {
      setInnerDotSize('35%');
      setIsSemiCircleRotated(true);
    } else {
      setInnerDotSize('60%');
      setIsSemiCircleRotated(false);
    }
  };

  const clickTabHandler = (tabIdx: number) => {
    setIsClicked(tabIdx);
  }
  const iconStyle = {fontSize: '5vw', color: 'white'}
  const iconArray = [<></>,<BiSearchAlt2 style={iconStyle}/>, <MdOutlineRecommend style={iconStyle}/>, <BsCalendarWeek style={iconStyle}/>, <CgProfile style={iconStyle}/>]

  return (
    <div>
      <DotContainer>
        <OuterDot onClick={toggleInnerDotSize}>
            <InnerDot size={innerDotSize}>
              {!isSemiCircleRotated && iconArray[isClicked]}
            </InnerDot>
        </OuterDot>
        <SemiCircle onClick={() => clickTabHandler(1)} rotated={isSemiCircleRotated} rotateAngle={['-90deg', '-45deg']} tabIdx={isClicked === 1}>
          <IconWrapper>
            <BiSearchAlt2 style={{ transform: 'rotate(45deg)', fontSize: '5vw', color: 'white' }}/>
          </IconWrapper>
        </SemiCircle>
        <SemiCircle onClick={() => clickTabHandler(2)} rotated={isSemiCircleRotated} rotateAngle={['-45deg', '0deg']} tabIdx={isClicked === 2}>
        <IconWrapper>
            <MdOutlineRecommend style={{ transform: 'rotate(0deg)', fontSize: '5vw', color: 'white' }}/>
          </IconWrapper>
        </SemiCircle>
        <SemiCircle onClick={() => clickTabHandler(3)} rotated={isSemiCircleRotated} rotateAngle={['0deg', '45deg']} tabIdx={isClicked === 3}>
        <IconWrapper>
            <BsCalendarWeek style={{ transform: 'rotate(-45deg)', fontSize: '5vw', color: 'white' }}/>
          </IconWrapper>
        </SemiCircle>
        <SemiCircle onClick={() => clickTabHandler(4)} rotated={isSemiCircleRotated} rotateAngle={['45deg', '90deg']} tabIdx={isClicked === 4}>
        <IconWrapper>
            <CgProfile style={{ transform: 'rotate(-90deg)', fontSize: '5vw', color: 'white' }}/>
          </IconWrapper>
        </SemiCircle>
        <BottomBar/>
      </DotContainer>
    </div>
  );
};

export default BottomDot;