import React from 'react'
import {GAME_STATE, DIFFICULTY} from '../custom/util'

const Header = ({ gameState, difficulty, activeLevel}) =>(

  <>
  <div className="header-header">
    <div className="header-top">
      <div className="header-topp x"></div>
      <div className="header-topp y"></div>
      <div className="header-topp z"></div>
      <div className="header-topp zz"></div>

    </div>
    <h1>Bjorne Says!</h1>
  </div>
  {gameState === GAME_STATE.READY ? 
    <div className="header">
      <h2>Instructions:</h2>
      <ul>
        <li>&#9745; Click the circles in the order they pop out</li>
        <li>&#9745; The pattern of the circles gets progresively longer each level </li>
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

export default Header