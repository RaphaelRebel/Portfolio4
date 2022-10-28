import "./ProjectsNav.css"
import ProjectLink from "../ProjectLink/ProjectLink"
import React from 'react'

const ProjectsNav = ({toBeRenderedprojectLinkItems}) => {
   

    return(
        
        <nav className="projectsNav">
            <h3>Projecten</h3>
            <ul className="projectsNav__ul">
                {toBeRenderedprojectLinkItems}
            </ul>
        </nav>
    )
}

export default ProjectsNav