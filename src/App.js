import React, { useEffect, useState } from "react";
import './App.css';
import images from "./components/Images";
import clicked from "./components/Clicked";

const App = () => {
  const [scores, setScore] = useState({
    score: 0,
    topScore: 0
  });
  // Initialise the starting state for the images
  const [imageTrack, setImageTrack] = useState(images);
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
    const currentId = event.currentTarget.id
    const currentName = event.currentTarget.name
    if (isClicked.includes(imageTrack[currentId - 1].name)) {
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

  return (
    <div id='wrapper'>
      <pre>Score: {scores.score}</pre>
      <pre>Top Score: {scores.topScore}</pre>
      <pre>{imageTrack.map(item => (
        <button id={item.id} name={item.name} onClick={scoreIncrease}>{item.name}</button>
      ))}
      </pre>
    </div>
  )
}

export default App;