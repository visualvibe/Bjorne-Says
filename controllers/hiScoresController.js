const mysql = require('mysql')
require('dotenv').config()

//Creates MySql Connection
const db = mysql.createPool({
  connectionLimit : 100,
  host : process.env.DB_HOST,
  user : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME
})

module.exports = (app) =>{

  //Method to add highscore
  app.post('/api/addhighscore', (req,res ) =>{
    var newHiScore = [
      [req.body.name, req.body.level, req.body.difficulty]
    ]

    let sql = "INSERT INTO users (name, level, difficulty) VALUES ?"
    db.query(sql, [newHiScore], (err,data)=>{
      if(err) throw err
      res.json({data})
    })
  })

  //Method to get easy highscores
  app.post('/api/highscores/easy', (req,res ) =>{


    let sql = "SELECT * FROM users WHERE difficulty = 'Easy' ORDER BY level DESC"
    db.query(sql, (err,data)=>{
      if(err) throw err
      res.json({data})
    })
  })

  //Method to get Medium highscores
  app.post('/api/highscores/medium', (req,res ) =>{


    let sql = "SELECT * FROM users WHERE difficulty = 'Medium' ORDER BY level DESC "
    db.query(sql, (err,data)=>{
      if(err) throw err
      res.json({data})
    })
  })

  //Method to get Hard highscores
  app.post('/api/highscores/hard', (req,res ) =>{


    let sql = "SELECT * FROM users WHERE difficulty = 'Hard' ORDER BY level DESC"
    db.query(sql, (err,data)=>{
      if(err) throw err
      res.json({data})
    })
  })
}