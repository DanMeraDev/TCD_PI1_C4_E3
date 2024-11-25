const getRandomElements = (array, count) => {
  if (!Array.isArray(array) || array.length === 0) return [];
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default getRandomElements;
