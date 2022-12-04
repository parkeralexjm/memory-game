import React, { useEffect, useState } from "react";
import './App.css';
import clicked from "./components/Clicked";
import importImages from "./components/ImportImages";

const imagesPNG = importImages(require.context('./images', false, /\.(png)$/))

const App = () => {
  const [scores, setScore] = useState({
    score: 0,
    topScore: 0
  });
  // Initialise the tracker for image clicking
  const [isClicked, setClicked] = useState(clicked)
  //const wrapper = document.getElementById('wrapper');
  
  useEffect (() => {
    // If the score is equal to or above the top score then update the top score
    if (scores.score >= scores.topScore) {
      setScore(prevScore => ({
        ...prevScore,
        topScore: scores.score
      }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scores.score]);

  // Increase the score on button click (add a conditional to check if the click)
  const scoreIncrease = (event) => {
    const currentName = event.currentTarget.name
    if (isClicked.includes(currentName)) {
      setScore(prevScore => ({
          ...prevScore,
          score: 0
      }));
      setClicked(clicked)
    } else {
    console.log(currentName)
    setClicked(prevClicked => [
      ...prevClicked, 
      currentName
    ])
    setScore(prevScore => ({
      ...prevScore,
      score: scores.score + 1
    }))
  }
}
  
  // Go to images.name or something to get the image for the svg
  return (
        <div id='wrapper'>
      <pre>Score: {scores.score}</pre>
      <pre>Top Score: {scores.topScore}</pre>
      <pre>{imagesPNG.map(item => (
        <img draggable="false" name={item.name} src={item.image} alt={item.name} onClick={scoreIncrease}></img>
      ))}
      </pre>
    </div>
  )
}

export default App;