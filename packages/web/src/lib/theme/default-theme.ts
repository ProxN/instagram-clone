import { DefaultTheme } from 'styled-components';
import { defaultTheme } from '@xstyled/styled-components';
import colors from './colors';
import { space } from './space';
import {
  transitionDuration as durations,
  timingFunctions,
  transitionProperties,
} from './transition';
import screens from './breakpoints';

const Theme: DefaultTheme = {
  ...defaultTheme,
  colorMode: 'light',
  white: '#fff',
  black: '#000',
  primary: 'indigo',
  lineHeight: '1.5',
  fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
   sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  radii: {
    xs: '0.2rem',
    sm: '0.4rem',
    md: '0.6rem',
    lg: '0.8rem',
    xl: '1.2rem',
  },
  shadows: {
    xs: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 10px 15px -5px, rgba(0, 0, 0, 0.04) 0px 7px 7px -5px',
    md: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
    lg: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 28px 23px -7px, rgba(0, 0, 0, 0.04) 0px 12px 12px -7px',
    xl: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 36px 28px -7px, rgba(0, 0, 0, 0.04) 0px 17px 17px -7px',
  },
  fontSizes: {
    xs: '1.2rem',
    sm: '1.4rem',
    md: '1.6rem',
    lg: '1.8rem',
    xl: '2rem',
    '2xl': '2.4rem',
    '3xl': '3rem',
    '4xl': '3.6rem',
    '5xl': '4.8rem',
    '6xl': '6rem',
    '7xl': '7.2rem',
    '8xl': '9.6rem',
    '9xl': '12.8rem',
  },
  colors,
  screens,
  space,
  durations,
  timingFunctions,
  states: {
    ...defaultTheme.states,
  },
  transitionProperties,
};

export default Theme;
