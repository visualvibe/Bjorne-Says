import React, {Component} from 'react'
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import HiScores from './components/hiscores/HiScores'

class App extends Component {

  render(){

    return (
      <BrowserRouter>
        <div className="App">
          <Header/>
            <Switch>
            <Route exact path="/bjorne-says" component={Home} />

            <Route path="/hiscores/leaderboards/" component={HiScores} />
            </Switch>
          
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
