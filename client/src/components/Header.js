import React from 'react'
import NavBar from './NavBar'

const Header = () =>(
   <div className="header-header">
    <div className="header-top">
      <div className="header-topp x"></div>
      <div className="header-topp y"></div>
      <div className="header-topp z"></div>
      <div className="header-topp zz"></div>
    </div>
    <div className="header-mid">
     <h1>Bjorne Says!</h1>
     <NavBar/>
    </div>
  </div>
)

export default Header