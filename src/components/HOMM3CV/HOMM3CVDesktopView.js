import React from 'react';
import styled from 'styled-components';
import homm3cvImage from '../../assets/HOMM3CV/HOMM3CV.png';

// Styled components for HOMM3 desktop view
const HOMM3Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  background: transparent;
`;

const HOMM3Background = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0;
  margin: 0;
`;

const HOMM3Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  user-select: none;
  pointer-events: none;
`;

const HOMM3CVDesktopView = () => {
  return (
    <HOMM3Container>
      <HOMM3Background>
        <HOMM3Image src={homm3cvImage} alt="Heroes of Might and Magic 3 style CV" />
      </HOMM3Background>
    </HOMM3Container>
  );
};

export default HOMM3CVDesktopView;
