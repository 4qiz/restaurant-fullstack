export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "м"; // million (м)
  } else if (num >= 1000) {
    return (num / 1000).toFixed(0) + "т"; // thousand (т)
  } else {
    return num.toString(); // no formatting for numbers below 1000
  }
};

export const formatCurrency = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";
};
