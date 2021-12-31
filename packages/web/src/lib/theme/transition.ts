export const transitionDuration = {
  instant: '50ms',
  faster: '100ms',
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  slower: '400ms',
  'ultra-slow': '500ms',
};

export const timingFunctions = {
  'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
  'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
  'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
};

export const transitionProperties = {
  default: [
    'background-color',
    'border-color',
    'color',
    'fill',
    'stroke',
    'opacity',
    'box-shadow',
    'transform',
  ],
  position: ['top', 'left', 'right', 'bottom'],
  colors: ['background-color', 'border-color', 'color', 'fill', 'stroke'],
  opacity: ['opacity'],
  shadow: ['box-shadow'],
  transform: ['transform'],
};

export type TransitionProperties = typeof transitionProperties;

export type TimingFunctions = typeof timingFunctions;

export type TransitionDuration = typeof transitionDuration;
