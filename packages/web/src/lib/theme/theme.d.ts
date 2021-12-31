import 'styled-components';
import '@xstyled/system';
import {
  ITheme,
  DefaultTheme as XStyledDefaultTheme,
} from '@xstyled/styled-components';
import { Tuple } from '@lib/types/utility-types';
import { SpaceType } from './space';
import {
  TimingFunctions,
  TransitionDuration,
  TransitionProperties,
} from './transition';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type FontSizes =
  | Size
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl';

export type ThemeSize = Record<Size, string | number>;

interface ThemeStates extends Pick<XStyledDefaultTheme, 'states'> {}

type States = ThemeStates['states'];

interface AppTheme extends ITheme, XStyledDefaultTheme {
  colorMode: 'light' | 'dark';
  white: string;
  black: string;
  primary: string;
  lineHeight: string;
  fontFamily: string;
  colors: Record<string, Tuple<string, 10>>;
  fontSizes: Record<FontSizes, string | number>;
  radii: ThemeSize;
  shadows: ThemeSize;
  screens: ThemeSize;
  space: SpaceType;
  durations: TransitionDuration;
  timingFunctions: TimingFunctions;
  transitionProperties: TransitionProperties;
  states: States & {
    sm?: null;
    xs?: null;
    lg?: null;
    md?: null;
  };
}

declare module '@xstyled/system' {
  export interface Theme extends AppTheme {}
}
declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
