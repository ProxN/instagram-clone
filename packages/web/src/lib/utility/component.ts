export const mode = (light: string, dark: string) => (colorMode: string) => {
  return colorMode === 'dark' ? dark : light;
};
