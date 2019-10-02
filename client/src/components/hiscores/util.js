import axios from 'axios'

//Function to get easy high scores from back end
export const getEasyScores = async () =>{
  return axios({
    method: 'POST', 
    url:'/apii/highscores/easy', 
    'content-type': 'application/json',
  }).then(data=>{
    return data.data
  })
}

//Function to get medium high scores from back end
export const getMediumScores = async () =>{
  return axios({
    method: 'POST', 
    url:'/apii/highscores/medium', 
    'content-type': 'application/json',
  }).then(data=>{
    return data.data
  })
}

//Function to get hard high scores from back end
export const getHardScores = async () =>{
  return axios({
    method: 'POST', 
    url:'/apii/highscores/hard', 
    'content-type': 'application/json',
  }).then(data=>{
    return data.data
  })
}