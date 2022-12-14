import "./Navigation.css"
import DesktopNavigation from "./DesktopNavigation"
import MobileNavigation from "./MobileNavigation"
import React from 'react'

const Navigation = (props) => {
         return(
                  <nav className="nav">
                       <DesktopNavigation updated={props.updated} name={props.name}/>
                       <MobileNavigation updated={props.updated} name={props.name}/>
                  </nav>
         )
}

export default Navigation