import Color from 'color';

export const isLight = (color: string) => {
  return Color(color).luminosity() > 0.65;
};

export const lighten = (color: string, by: number) => {
  return Color(color).lighten(by).rgb().string();
};

export const transparentize = (color: string, opacity: number) => {
  return Color(color).alpha(opacity).rgb().string();
};

export const getColor = (
  palette: { [key: string]: string[] },
  key: string,
  shade: number
) => {
  const color = palette[key];
  if (!color) return '';

  return color[shade];
};
