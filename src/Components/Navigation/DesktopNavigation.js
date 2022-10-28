import "./Navigation.css"
import NavLinks from "./NavLinks"
import React from 'react'

const DesktopNavigation = (props) => {
         return(
        <div className="desktopNavigation">
         <NavLinks updated={props.updated} name={props.name}/>
         </div>
    )
}

export default DesktopNavigation