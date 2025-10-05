export const getWeatherIcon = (icon?: string): string => {
  const fallbackIcon = '01d';
  const iconToUse = icon || fallbackIcon;
  return `https://openweathermap.org/img/wn/${iconToUse}@2x.png`;
};
