const shuffle = (array) => {
  const shuffledArray = array.sort(() => 0.5 - Math.random());

  let selection = shuffledArray.slice(0, 8);
  return selection
}

export default shuffle;