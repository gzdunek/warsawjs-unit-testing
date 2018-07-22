import { isPositiveNumber } from './TestUtils';

describe('TestUtils is positive number', () => {
  test('should return true', () => {
    expect(isPositiveNumber(123)).toEqual(true);
  });
  test('should return false', () => {
    expect(isPositiveNumber(-123)).toEqual(false);
  });
});