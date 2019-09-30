import React, {Component} from 'react'
import Circle from './components/Circle'
import Header from './components/Header'
import {GAME_STATE, ROUND_STATE, DIFFICULTY, getSeconds, getTimeLeft, randomizePattern} from './custom/util'
import AfterRoundModal from './components/modals/AfterRoundModal'
import StartGameModal from './components/modals/StartGameModal'

const COUNTDOWN_TIMER = 3000;
const initState = {
  pattern: [],
  activeCircle: '',
  userInput: [],
  difficulty: DIFFICULTY.EASY,
  gameState: GAME_STATE.READY,
  roundState: ROUND_STATE.READY,
  isAfterRoundModalOpen: false,
  isStartGameModalOpen: false,
  activeLevel: 1,
  currentCircle: 1,
  wasCorrect: false,
  countdownTimer: 0,
  circles: [
    {color: 'red', id: 1},
    {color: 'blue', id: 2},
    {color: 'green', id: 3},
    {color: 'yellow', id: 4}
  ]
}
class App extends Component {

  constructor(){
    super()
    this.state = initState
  }

  play = async () =>{
    randomizePattern(this.state.activeLevel).then((data) =>{
      console.log(data)
      this.currentDeadline = Date.now() + COUNTDOWN_TIMER;
      this.setState({
        pattern: data,
        gameState: GAME_STATE.PLAYING,
        roundState: ROUND_STATE.COUNTING,
        countdownTimer: getTimeLeft(this.currentDeadline)
      })
      this.gameLoop()

    })
  }

  gameLoop = async () =>{
    await ( () => {if(this.state.roundState === ROUND_STATE.COUNTING){
      this.timer = setInterval(() => {
        const timeLeft = getTimeLeft(this.currentDeadline);
        const isTimeout = timeLeft <= 0;
        if (isTimeout && this.timer) {
          clearInterval(this.timer);
        }
  
        this.setState({
          countdownTimer: isTimeout ? 0 : timeLeft,
          ...(isTimeout ? this.x() : {}),
        });
      }, 900);
    } }) ()


      
  }

  x = async () =>{
    this.setState({
      roundState: ROUND_STATE.SHOWING
    })
    for(let i=0; i<=this.state.pattern.length; i++){
      setTimeout( () =>{
        this.setState({
          activeCircle: this.state.pattern[i],
          currentCircle: i+1
        })
        if(i === this.state.pattern.length){
          this.setState({
            roundState: ROUND_STATE.PLAYABLE
          })
        }
        }, i * this.state.difficulty)
      }
  }
  

  handleStart = (e) =>{
    this.setState({
      isStartGameModalOpen: true
    })
  }

  handleGo = () =>{
    this.setState({
      isStartGameModalOpen: false,
    })
    this.play()
  }
  

  handleClick = (e, i) =>{
    console.log("pattern", this.state.pattern)
    this.state.userInput.push(i)
    console.log("user", this.state.userInput)

    if(this.state.userInput.length === this.state.pattern.length){
      if(JSON.stringify(this.state.userInput) === JSON.stringify(this.state.pattern)){
        this.setState({
          wasCorrect: true,
          roundState: ROUND_STATE.DONE,
          isAfterRoundModalOpen: true
        })
      } else{
        this.setState({
          wasCorrect: false,
          isAfterRoundModalOpen: true
        })
      }
    }
  }



  handleNext = async (e, i) =>{
    e.preventDefault()
    let nextLevel = i + 1
    await this.setState({
      activeLevel: nextLevel,
      isAfterRoundModalOpen: false,
      roundState: ROUND_STATE.SHOWING,
      userInput: []
    })
    this.play()
  }

  handleClose = (e) =>{
    this.setState(initState)
    this.setState({
      userInput: []
    })
  }

  handleDifficulty = (e) =>{
    e.preventDefault()
    this.setState({
      difficulty: e.target.value
    })
  }
  render(){
    console.log(this.state.roundState)
    return (
      <div className="App">
        <Header 
          handleStart={this.handleStart} 
          gameState={this.state.gameState}
          activeLevel={this.state.activeLevel}
          difficulty={this.state.difficulty}/>
        {this.state.isAfterRoundModalOpen === true && (
          <AfterRoundModal 
            activeLevel={this.state.activeLevel}
            handleNext={this.handleNext}
            wasCorrect={this.state.wasCorrect}
            handleClose={this.handleClose} 
        />)}
        {this.state.isStartGameModalOpen === true && (
          <StartGameModal 
            handleGo={this.handleGo}
            handleDifficulty={this.handleDifficulty}
            difficulty={this.state.difficulty} />)}
        <div className="circles-container">
          {this.state.gameState === GAME_STATE.READY && this.state.isStartGameModalOpen === false ?
            <button className="start-button" onClick={(e) =>{this.handleStart(e)}}>Start Game</button>
          :
            <span className="mid-text">
              {this.state.roundState === ROUND_STATE.COUNTING ?
                <span id="countdown">{getSeconds(this.state.countdownTimer)}</span>
              :
              this.state.roundState === ROUND_STATE.SHOWING ?
                "Bjorne says..."
              :
                "Go!"
              }
            </span>
          }
          
          <Circle 
            currentCircle={this.state.currentCircle} 
            activeLevel={this.state.activeLevel} 
            circles={this.state.circles} 
            activeCircle={this.state.activeCircle} 
            handleClick={this.handleClick}
            roundState={this.state.roundState}
            difficulty={this.state.difficulty} />
        </div>
      </div>
    )
  }
}

export default App;
