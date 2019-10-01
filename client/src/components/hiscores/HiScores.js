import React, {Component} from 'react'
import {getEasyScores, getMediumScores, getHardScores} from './util'

class HiScores extends Component {
  constructor(){
    super()
    this.state = {
      activeDifficulty: 0,
      activeScores: []
    }
  }

  async componentDidMount(){
    let easyScores = await getEasyScores()
    this.setState({
      activeDifficulty: 0,
      activeScores: easyScores.data
    })
  }
  handleEasy = async () =>{
    let easyScores = await getEasyScores()
    this.setState({
      activeDifficulty: 0,
      activeScores: easyScores.data
    })
  }

  handleMedium = async () =>{
    let mediumScores = await getMediumScores()
    this.setState({
      activeDifficulty: 1,
      activeScores: mediumScores.data
    })
  }

  handleHard = async () =>{
    let hardScores = await getHardScores()
    this.setState({
      activeDifficulty: 2,
      activeScores: hardScores.data
    })
  }

  render(){
    console.log(this.state.activeScores)
    const scoreList = this.state.activeScores.map((score,i) =>(
      <>
      <div>
        {i+1}
      </div>
      <div>
        {score.name}
      </div>
      <div>
        {score.difficulty}
      </div>
      <div>
        {score.level}
      </div>
      </>
    ))
    return(
    <div className="leaderboards-container">
      <h1>High Scores Leaderboards</h1>
      
      <div className="leaderboards-buttons-container">
      <button id="easy-button" onClick={(e) => {this.handleEasy(e)}}>Easy</button>
      <button id="medium-button" onClick={(e) => {this.handleMedium(e)}}>Medium</button>
      <button id="hard-button" onClick={(e) => {this.handleHard(e)}}>Hard</button>
      </div>
      <div className="scorelist">
        <p>Rank</p>
        <p>Player Name</p>
        <p>Difficulty</p>
        <p>Level</p>
        {scoreList}
      </div>
    </div>
    )
  }
}

export default HiScores