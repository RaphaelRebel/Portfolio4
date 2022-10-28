import "./ExperiencePart.css"
// import {useEffect, useState} from 'react';
import React from 'react'

const ExperiencePart = (props) => {

  // const [isClicked, setIsClicked] = useState(false)

  // const toggleText = () => {
  //   setIsClicked(current => !current)
  //   console.log({isClicked})
  // }

  // Code voor classname aan de div: className={`experience__part ${isClicked ? "experience__part-explain" : ""} `}
         return(
                  <div  className={`experience__part`}>
                    <div>
                    {props.icon}
                <h3 className="experience__part-h3">{props.title}</h3>
                </div>
                    <p className="  experience__part-subject">{props.subject}</p>
                </div>
         )
}

export default ExperiencePart