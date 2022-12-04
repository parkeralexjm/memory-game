const shuffle = (array) => {
  const shuffledArray = array.sort(() => 0.5 - Math.random());

  let selection = shuffledArray.slice(0, 12);
  return selection
}

export default shuffle;