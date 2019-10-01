import axios from 'axios'

export const getEasyScores = async () =>{
  return axios({
    method: 'POST', 
    url:'/api/highscores/easy', 
    'content-type': 'application/json',
  }).then(data=>{
    return data.data
  })
}

export const getMediumScores = async () =>{
  return axios({
    method: 'POST', 
    url:'/api/highscores/medium', 
    'content-type': 'application/json',
  }).then(data=>{
    return data.data
  })
}
export const getHardScores = async () =>{
  return axios({
    method: 'POST', 
    url:'/api/highscores/hard', 
    'content-type': 'application/json',
  }).then(data=>{
    return data.data
  })
}