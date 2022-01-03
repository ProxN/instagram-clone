import styled, { css } from '@xstyled/styled-components';
import { Box } from '@components/layout/Box';

export const AccountNavItem = styled(Box)<{ active?: boolean }>`
  padding: 1.5rem 2rem;
  cursor: pointer;
  position: relative;
  border-left: 2px solid transparent;

  :hover {
    background-color: gray.0;
    border-color: gray.5;
  }

  ${({ active }) =>
    active &&
    css`
      border-color: blackAlpha.9;
      :hover {
        border-color: blackAlpha.9;
      }
    `}
`;
