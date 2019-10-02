import React from 'react'
import {DIFFICULTY} from '../../custom/util'

const StartGameModal = ({handleGo, handleDifficulty, difficulty}) =>(
  <div className="modal start-game">
    <div className="modal-header">
      <span>Game Start</span>
    </div>
    <div className="modal-content">

      <label>Difficulty: </label>
      <select value={difficulty} onChange={(e) => {handleDifficulty(e)}}>
        <option id="easy" value={DIFFICULTY.EASY}>Easy</option>
        <option id="medium" value={DIFFICULTY.MEDIUM}>Medium</option>
        <option id="hard" value={DIFFICULTY.HARD}>Hard</option>
      </select>
    </div>
    <div className="modal-buttons">
      <button onClick={(e) =>{handleGo(e)}}>Start</button>
    </div>
  </div>
)

export default StartGameModal