import "./ProjectsNav.css"
import ProjectLink from "../ProjectLink/ProjectLink"

const ProjectsNav = ({toBeRenderedprojectLinkItems}) => {
   

    return(
        
        <nav className="projectsNav">
            <h3>Projects</h3>
            <ul className="projectsNav__ul">
                {toBeRenderedprojectLinkItems}
            </ul>
        </nav>
    )
}

export default ProjectsNav