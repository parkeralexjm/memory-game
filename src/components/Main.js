import React, { useEffect, useState } from "react";
import clicked from "./Clicked";
import importImages from "./ImportImages";
import shuffle from "./Utility";
import loseSong from "../assets/lose.mp3";
import Overlay from "./Overlay";

const imagesPNG = importImages(require.context('../assets/images', false, /\.(png)$/))
const audio = new Audio(loseSong)
const loseMessage = document.getElementById('overlay')
let audioActive = 1;

const Main = () => {
  const [scores, setScore] = useState({
    score: 0,
    topScore: 0
  });
  // Initialise the tracker for image clicking
  const [isClicked, setClicked] = useState(clicked)
  
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
    // Lose condition
    if (audioActive) {  
      if (isClicked.includes(currentName)) {
        setScore(prevScore => ({
            ...prevScore,
            score: 0
        }));
        setClicked(clicked)
        audio.volume = 0.4
        audio.play()
        loseMessage.classList.toggle('overlay-on')
        // Set onclick not to trigger while sound is active
        audioActive = 0;
        setTimeout(function() {
          audioActive = 1
          loseMessage.classList.toggle('overlay-on')
        }, 3200);
        
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
}
  
  // Go to images.name or something to get the image for the svg
  return (
    <div className='main'>
      <pre className="current">Current score: {scores.score}</pre>
      <pre className="top">Top Score: {scores.topScore}</pre>
      <div className="instruction">Get points for choosing a character, but dont pick the same one more than once!</div>
      <div className="imageDisplay">{shuffle(imagesPNG).map(item => (
        <img draggable="false" className="imageTile" name={item.name} src={item.image} alt={item.name} onClick={scoreIncrease}></img>
      ))}
      </div>
      <Overlay/>
    </div>
  )
}

export default Main;