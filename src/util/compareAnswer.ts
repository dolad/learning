export const compareArray = (array1, array2) => {
  let counter = 0;
  for (let i = 0; i <= array2.length - 1; i++) {
    if (array1[i] === array2[i]) {
      counter++;
    }
  }
  return counter;
};

export const calculatePercentage = (score, totalQuestion) => {
  return (score / totalQuestion) * 100;
};
