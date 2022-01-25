/**
 * Initial recursive implementation
 * Most straightforward way to implement the flatten operation
 * Main drawback: depending on which JS engine is used, tail call optimization
 * might not be implemented.
 * This can lead to errors like: RangeError: Maximum call stack size exceeded.
 * @param {*} arr - maybe nested array containing any type of elements
 * @param {*} acc internal value used for tail call optimization
 * @returns flattened array
 */
function flattenHelper(arr, acc = null) {
  const res = acc !== null ? acc : [];

  arr.forEach((elem) => {
    if (Array.isArray(elem)) {
      flattenHelper(elem, res);
    } else {
      res.push(elem);
    }
  });

  return res;
}

function flatten(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('top-level value should be an array');
  }

  return flattenHelper(arr);
}

module.exports = flatten;
