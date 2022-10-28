import React from 'react'
import Info from "../Info/Info"
import ProjectsNav from "../ProjectsNav/ProjectsNav"
import "./ProjectPage.css"

class ProjectPage extends React.Component {
         constructor(props) {
                  super(props)
                  this.state = { projectLinkItems: [], lastUsed: {}, item: "" }
              }
          
          
              componentDidMount() {
                  let projectLinkItems = [
                      {
                          name: "Tekton",
                      },
                      {
                          name: "Fifty-ish",
                      },
                      {
                          name: "ForFighters",
                      },
                      {
                          name: "Reactomon",
                      },
                      {
                          name: "RaphaelRebel3",
                      },
          
                  ];
          
                  this.setState({projectLinkItems: projectLinkItems})
          
              }
          
          
              componentDidUpdate(){
              }
              
          
              clicked = (itemName) => {
                 
                  let filtered = this.state.projectLinkItems.filter( link => {
                      return itemName === link.name;
                  });
                  this.setState({lastUsed: filtered, item: itemName});
          
          
              }
              render() {


                  let toBeRenderedprojectLinkItems2 = this.state.projectLinkItems.map(item => {
                      
                      return <li key={item.name}className="projectLink" onClick={() => {this.clicked(item.name)}}>{item.name}</li>;
                  })
                  return (
                      
                      <section className="project">
                          <ProjectsNav toBeRenderedprojectLinkItems={toBeRenderedprojectLinkItems2} projectLinkItems={this.projectLinkItems} />
                          <Info name={this.props.name} project={this.state.item} />
          
                          
                      </section>
                  )
              }
          }
          
         
          export default ProjectPage
          
