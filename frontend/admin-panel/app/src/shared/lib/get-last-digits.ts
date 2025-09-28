/**
 * Получает последние цифры числа в виде строки.
 *
 * @param num - Число, из которого нужно извлечь последние цифры.
 * @param digits - Количество последних цифр (по умолчанию 4).
 * @returns Строка, содержащая последние `digits` цифры числа, дополненная нулями при необходимости.
 */
export const getLastDigits = (num: number, digits: number = 4): string => {
  const strNum = num.toString(); // Преобразуем число в строку
  const lastThree = strNum.slice(-digits); // Получаем последние `digits` цифры
  return lastThree.padStart(digits, "0"); // Дополняем строку нулями слева, если недостаточно цифр
};
