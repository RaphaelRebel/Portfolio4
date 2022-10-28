import "./ProjectLink.css"
import React from 'react'

const ProjectLink = (props) => {
    return(
        <li className="projectLink">
           
          <a className="projectLink__a">  {props.projectLink}</a>
        </li>
    )
}

export default ProjectLink