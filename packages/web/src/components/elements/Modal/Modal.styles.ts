import styled from '@xstyled/styled-components';
import { m } from 'framer-motion';
import { mode } from '@lib/utility/component';

export const Overylay = styled(m.div)<{ rgba: number }>`
  position: fixed;
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: ${({ theme, rgba }) =>
    mode(
      theme.colors['blackAlpha'][rgba],
      theme.colors['blackAlpha'][6]
    )(theme.colorMode)};
`;

export const ModalContainer = styled(m.div)`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  border-radius: xs;
  box-shadow: xs;
  background-color: ${({ theme }) =>
    mode('#fff', theme.colors['dark'][9])(theme.colorMode)};
`;
