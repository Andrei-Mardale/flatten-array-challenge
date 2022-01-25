/* global test, expect */

const flatten = require('./flatten');

test('flattening an empty array does nothing', () => {
  expect(flatten([])).toEqual([]);
});

test('flatten raises an error if called with a non-array', () => {
  const functionCall = () => flatten(1);

  expect(functionCall).toThrow(TypeError);
});

test('flattening a nested empty array returns an empty array', () => {
  expect(flatten([[]])).toEqual([]);
});

test('flatten does nothing for flat arrays', () => {
  expect(flatten([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
});

test('flatten does actually work for simple nested arrays', () => {
  expect(flatten([1, [2], [3, [[[4]]], 5]])).toEqual([1, 2, 3, 4, 5]);
});

test('random empty arrays are ignored', () => {
  expect(flatten([1, [], [2], [[[]]], [3, [], [[[4]]], 5, []]]))
    .toEqual([1, 2, 3, 4, 5]);
});

test('flatten workes for arrays with different element types', () => {
  const elem1 = {};
  const elem2 = { a: 1, b: 2 };
  const elem3 = 'some string';
  const elem4 = 4;
  const elem5 = null;

  const nestedArr = [elem1, [[elem2]], elem3, [[[elem4], elem5]]];

  const flattenedArr = flatten(nestedArr);
  const expectedResult = [elem1, elem2, elem3, elem4, elem5];
  expect(flattenedArr).toEqual(expectedResult);

  /**
   * ok, now let's check that elements are copied by asignment
   * (as opposed to a deep copy)
   */

  for (let i = 0; i < expectedResult.length; i += 1) {
    expect(flattenedArr[i]).toBe(expectedResult[i]);
  }
});
