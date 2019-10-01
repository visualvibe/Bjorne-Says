import React from 'react'
import {GAME_STATE, DIFFICULTY} from '../custom/util'

const HeaderGame = ({ gameState, difficulty, activeLevel}) =>(

  <>
  {gameState === GAME_STATE.READY ? 
    <div className="header">
      <h2>Instructions:</h2>
      <ul>
        <li>&#9745; Click the circles in the order they pop out</li>
        <li>&#9745; The pattern of the circles gets progresively longer each level </li>
        <li>&#9745; Make it to level 5 and pass to insert yourself into the Leaderboards!</li>
      </ul>
      
    </div>
  :
    <div className="header game-playing">
      <div className="header-level">
        <span>Level: {activeLevel}</span>
      </div>
      <div className="header-difficulty">
        <span>Difficulty: {difficulty === DIFFICULTY.EASY ? "Easy" : difficulty == DIFFICULTY.MEDIUM ? "Medium" : difficulty == DIFFICULTY.HARD ? "Hard" : ""}</span>
      </div>
    </div>
  }
  </>
)

export default HeaderGame