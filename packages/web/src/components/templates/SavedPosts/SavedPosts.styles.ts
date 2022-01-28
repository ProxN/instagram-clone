import styled from '@xstyled/styled-components';

export const PostOverlay = styled.div`
  background-color: blackAlpha.6;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -10;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

export const PostContainer = styled.div`
  position: relative;
  cursor: pointer;
  height: 100%;
  width: 100%;

  :hover ${PostOverlay} {
    z-index: 999;
  }
`;
