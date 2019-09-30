import React from 'react'

const AfterRoundModal = ({activeLevel, wasCorrect, handleNext, handleClose}) =>(
  <div className={wasCorrect ? "modal after-round correct" : "modal after-round incorrect" }>
    <div className={wasCorrect === true ? "modal-header" : "modal-header"}>
      {wasCorrect === true ? 
        <span>Correct!</span>
      : 
        <span>Incorrect!</span>}
    </div>
    <div className="modal-content">
      {wasCorrect === false ?
        <span>You failed level {activeLevel}!</span>
      : 
        <span>Well Done! You passed level {activeLevel}</span> }
    </div>
    <div className="modal-buttons">
      {wasCorrect === true ?
        <button onClick={(e) =>{handleNext(e, activeLevel)}}>Next Level</button>
      :
        <button onClick={(e) =>{handleClose(e)}}>Close</button>
      }
      
    </div>
  </div>
)

export default AfterRoundModal