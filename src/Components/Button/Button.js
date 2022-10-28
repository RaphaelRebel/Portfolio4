import "./Button.css"
import React from 'react'

const Button = (props) => {
         return(
                  <button className="button"><a target='_blank' href={props.link}>{props.name}</a></button>
         )
}

export default Button 