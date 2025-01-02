export const findSequence = function (needle, haystack) {
  let index = 0;
  while (index <= haystack.length - needle.length) {
    if (haystack[index] === needle[0]) {
      let foundCompleteSequence = true;
      for (let testIndex = 0; testIndex < needle.length; testIndex++) {
        if (haystack[index + testIndex] !== needle[testIndex]) {
          foundCompleteSequence = false;
          break;
        }
      }
      if (foundCompleteSequence) {
        return index;
      }
    }
    index++;
  }
  return -1;
};
