export const abbreviateNumberFormatter = (num: number | string) => {
  num = Number(num);
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(num);
};