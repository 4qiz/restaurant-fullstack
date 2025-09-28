import { getLastDigits } from "../../shared/lib/get-last-digits";

describe("getLastDigits", () => {
  test("возвращает последние 3 цифры числа", () => {
    // Arrange: задаем исходные данные
    const num = 123456;

    // Act: вызываем тестируемую функцию
    const result = getLastDigits(num);

    // Assert: проверяем ожидаемый результат
    expect(result).toBe("456");
  });

  test("возвращает последние 2 цифры числа, если digits = 2", () => {
    // Arrange
    const num = 123456;
    const digits = 2;

    // Act
    const result = getLastDigits(num, digits);

    // Assert
    expect(result).toBe("56");
  });

  test("возвращает последние 5 цифр числа, если digits = 5", () => {
    // Arrange
    const num = 123456;
    const digits = 5;

    // Act
    const result = getLastDigits(num, digits);

    // Assert
    expect(result).toBe("23456");
  });

  test("дополняет нулями слева, если число короче указанного digits", () => {
    // Arrange
    const num = 45;
    const digits = 5;

    // Act
    const result = getLastDigits(num, digits);

    // Assert
    expect(result).toBe("00045");
  });

  test("по умолчанию возвращает последние 3 цифры", () => {
    // Arrange
    const num = 123456;

    // Act
    const result = getLastDigits(num);

    // Assert
    expect(result).toBe("456");
  });

  test("возвращает число, если digits больше или равно числу", () => {
    // Arrange
    const num1 = 12;
    const digits1 = 3;
    const num2 = 123;
    const digits2 = 5;

    // Act
    const result1 = getLastDigits(num1, digits1);
    const result2 = getLastDigits(num2, digits2);

    // Assert
    expect(result1).toBe("012");
    expect(result2).toBe("00123");
  });

  test("возвращает 0, если число равно 0 и digits = 3", () => {
    // Arrange
    const num = 0;
    const digits = 3;

    // Act
    const result = getLastDigits(num, digits);

    // Assert
    expect(result).toBe("000");
  });
});
