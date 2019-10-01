import axios from 'axios'

export const GAME_STATE = {
  READY: 'ready',
  PLAYING: 'playing',
  DONE: 'done'
}

export const ROUND_STATE = {
  READY: 'ready',
  COUNTING: 'counting',
  SHOWING: 'showing',
  PLAYABLE: 'playable',
  DONE: 'done'
}

export const DIFFICULTY = {
  EASY: 1600,
  MEDIUM: 800,
  HARD: 200
}

//method to get time left
export const getTimeLeft = deadline => deadline - Date.now()

//method to get time left in seconds
export const getSeconds = timeLeft => Math.floor(timeLeft / 1000)

//Function that randomizes circle pattern
export const randomizePattern = async (activeLevel) =>{
  let numPattern = activeLevel
  let randomPattern = []
  //Pushes random into randomPattern array values 1-4
  for(let i = 0; i<numPattern; i++){
    let x = Math.floor(Math.random () * 4) + 1
    randomPattern.push(x)
  }
  return randomPattern
}

export const addToHiScores = (name, level, difficulty) =>{
  let dif = difficulty === 1600 ? 'Easy' : difficulty === 800 ? 'Medium' : 'Hard'
  axios({
    method: 'POST', 
    url:'/api/addhighscore', 
    'content-type': 'application/json',
    data: {
      name: name,
      level: level,
      difficulty: dif
    }
  })
}

