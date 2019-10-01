import React, {Component} from 'react'
import Circle from './Circle'
import HeaderGame from './HeaderGame'
import {GAME_STATE, ROUND_STATE, DIFFICULTY, getSeconds, getTimeLeft, randomizePattern, addToHiScores} from '../custom/util'
import AfterRoundModal from './modals/AfterRoundModal'
import StartGameModal from './modals/StartGameModal'

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
  name: '',
  circles: [
    {color: 'red', id: 1},
    {color: 'blue', id: 2},
    {color: 'green', id: 3},
    {color: 'yellow', id: 4}
  ]
}
class Home extends Component {

  constructor(){
    super()
    this.state = initState
  }

  //Function that handles the start of every game/round
  play = async () =>{
    //Generates a random pattern for each round
    randomizePattern(this.state.activeLevel).then((data) =>{
      //Starts 3s countdown timer
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

  //Function the starts the game loop
  gameLoop = async () =>{
    //Countdowns from 3s
    await ( () => {if(this.state.roundState === ROUND_STATE.COUNTING){
      this.timer = setInterval(() => {
        const timeLeft = getTimeLeft(this.currentDeadline);
        const isTimeout = timeLeft <= 0;
        if (isTimeout && this.timer) {
          clearInterval(this.timer);
        }
        
        //When timer is 0, show pattern
        this.setState({
          countdownTimer: isTimeout ? 0 : timeLeft,
          ...(isTimeout ? this.showPattern() : {}),
        });
      }, 900);
    } }) ()
  }

  //Function that shows circle pattern
  showPattern = async () =>{
    this.setState({
      roundState: ROUND_STATE.SHOWING
    })
    for(let i=0; i<=this.state.pattern.length; i++){
      setTimeout( () =>{
        this.setState({
          activeCircle: this.state.pattern[i],
          currentCircle: i+1
        })
        //Make round playable when pattern is finished showing
        if(i === this.state.pattern.length){
          this.setState({
            roundState: ROUND_STATE.PLAYABLE
          })
        }
        }, i * this.state.difficulty)
      }
  }
  

  //Function that intializes game
  handleStart = (e) =>{
    this.setState({
      isStartGameModalOpen: true
    })
  }

  //Function that starts game
  handleGo = () =>{
    this.setState({
      isStartGameModalOpen: false,
    })
    this.play()
  }
  

  //Function that handles user click on circle
  handleClick = (e, i) =>{
    //Pushes user input into state array
    this.state.userInput.push(i)
    //When user input array is same size as the pattern array, check for match
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

  //Function that handles next round
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

  //Function that handles game over close button
  handleClose = (e) =>{
    this.setState(initState)
    this.setState({
      userInput: []
    })
  }

  //Function that handles on change of difficulty level
  handleDifficulty = (e) =>{
    e.preventDefault()
    this.setState({
      difficulty: e.target.value
    })
  }

  handleSubmit = (e) =>{
    addToHiScores(this.state.name, this.state.activeLevel-1, this.state.difficulty)
  }
  onChange = (e) =>{
    this.setState({ name: e.target.value })
  }
  render(){
    return (
      <>
        <HeaderGame 
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
            handleSubmit={this.handleSubmit}
            onChange={this.onChange}
            name={this.state.name}
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

      </>
    )
  }
}

export default Home;
