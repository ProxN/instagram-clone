import styled, { th } from '@xstyled/styled-components';

export const Wrapper = styled.div`
  font-family: ${th('fontFamily')};
  line-height: 1.4;
  width: 100%;
  height: 100%;
`;

export const Required = styled.span`
  color: red.6;
  margin-left: 0.3rem;
`;

export const Label = styled.label`
  font-weight: 600;
  font-size: sm;
  display: block;
  margin-bottom: 0.6rem;
`;
