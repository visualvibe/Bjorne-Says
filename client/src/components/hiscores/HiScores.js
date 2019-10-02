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
      <div className="scorelist-rank">
        {i+1}
      </div>
      <div className="scorelist-name">
        {score.name}
      </div>
      <div className="scorelist-difficulty">
        {score.difficulty}
      </div>
      <div className="scorelist-level">
        {score.level}
      </div>
      </>
    ))
    return(
    <div className="leaderboards-container">
      <h1>High Scores Leaderboards</h1>
      
      <div style={{borderColor: this.state.activeDifficulty === 0 ? '#65ffa0' : this.state.activeDifficulty === 1 ? '#ffc165' : '#ff7465' }} className="leaderboards-buttons-container">
      <button 
        style={{background: this.state.activeDifficulty === 0 ? '#65ffa0' : ''}}
        id="easy-button" 
        onClick={(e) => {this.handleEasy(e)}}>Easy</button>
      <button style={{background: this.state.activeDifficulty === 1 ? '#ffc165' : ''}} id="medium-button" onClick={(e) => {this.handleMedium(e)}}>Medium</button>
      <button style={{background: this.state.activeDifficulty === 2 ? '#ff7465' : ''}} id="hard-button" onClick={(e) => {this.handleHard(e)}}>Hard</button>
      </div>
      <div className="scorelist">
        <p>RANK</p>
        <p>PLAYER NAME</p>
        <p>DIFFICULTY</p>
        <p>LEVEL</p>
          {scoreList}
      </div>
    </div>
    )
  }
}

export default HiScores