import styled, { breakpoints, css } from '@xstyled/styled-components';
import { Space, SpaceProps } from '@components/layout/Space';

export const StoriesContainer = styled(Space)<SpaceProps>`
  overflow: auto hidden;
  padding: 2rem 2.5rem;
  scrollbar-width: none;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
  border-radius: sm;
  border-bottom: 1px solid;
  border-color: blackAlpha.3;

  ${breakpoints({
    sm: css`
      background-color: #fff;
      border: 1px solid;
      border-color: blackAlpha.3;
    `,
  })}
  ::-webkit-scrollbar {
    display: none;
    width: 0;
  }
`;
