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
// eslint-disable-next-line no-unused-vars
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

/**
 * More complicated implementation that avoids max recursion depth errors
 * This explicitly uses a stack instead of relying on language-level recursion
 * @param {*} arr - maybe nested array containing any type of elements
 * @param {*} acc internal value used for tail call optimization
 * @returns flattened array
 */
function flattenHelperIterative(initialArray) {
  const res = [];

  const processStack = [{ array: initialArray, idx: 0 }];

  while (processStack.length > 0) {
    const { array, idx } = processStack.pop();

    for (let i = idx; i < array.length; i += 1) {
      const elem = array[i];

      if (Array.isArray(elem)) {
        /**
         * sub-array encountered
         * We have to process this sub-array first and then resume from the next index
         */

        // mark that we must continue from the next index for the current array
        processStack.push({ array, idx: i + 1 });

        // but first process the sub-array
        processStack.push({ array: elem, idx: 0 });

        // break the current loop - will be resumed by a future stack pop operation
        break;
      } else {
        res.push(array[i]);
      }
    }
  }

  return res;
}

function flatten(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('top-level value should be an array');
  }

  return flattenHelperIterative(arr);
}

module.exports = flatten;
