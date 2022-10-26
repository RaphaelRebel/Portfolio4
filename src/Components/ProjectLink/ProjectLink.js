import "./ProjectLink.css"

const ProjectLink = (props) => {
    return(
        <li className="projectLink">
           
          <a className="projectLink__a">  {props.projectLink}</a>
        </li>
    )
}

export default ProjectLink