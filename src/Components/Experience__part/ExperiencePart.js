import "./ExperiencePart.css"
import {useEffect, useState} from 'react';

const ExperiencePart = (props) => {

  // const [isClicked, setIsClicked] = useState(false)

  // const toggleText = () => {
  //   setIsClicked(current => !current)
  //   console.log({isClicked})
  // }

  // Code voor classname aan de div: className={`experience__part ${isClicked ? "experience__part-explain" : ""} `}
         return(
                  <div  className={`experience__part`}>
                <h3 className="experience__part-h3">{props.title}</h3>
                    <p className="experience__part-subject">{props.subject}</p>
                </div>
         )
}

export default ExperiencePart