import React from 'react';
import {NavLink} from 'react-router-dom'

const NavBar = () =>{
  return(
    <div className="user-navbar">
      <NavLink id="play-button"  activeClassName="active-link" to={{ pathname: '/bjorne-says'}}>
        PLAY
      </NavLink>
      <NavLink id="leaderboards-button"  activeClassName="active-link" to={{ pathname: '/hiscores/leaderboards/'}}>
        LEADERBOARDS
      </NavLink>
    </div>
  )
}

export default NavBar