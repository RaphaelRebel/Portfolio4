import "./Project.css"
import React from 'react'
import { render } from "@testing-library/react"
import Button from "../Button/Button"

class Project extends React.Component{

    // Zet hier een class in!!!! Stop de state in de class en verander het terug naar false nadat de animatie 1 keer is geklikt!!!

    constructor(props){
        super(props)
        this.state = {state: false}
    }

    componentDidMount(){
        this.setState({state: this.props.state})

    }

    componentDidUpdate(){
        if(this.state.state === true){
        this.setState({state: false})}
    }

    componentDidCatch(){
      
    }

    
    render(){
        
       let github = null
        if(this.props.name === 'Github'){
            github = <Button name={this.props.name} link={this.props.link}/>
        }

        let site = null
        if(this.props.website === 'Website'){
            site = <Button name={this.props.website} link={this.props.site}/>
        }

        let img = ""
        if(this.props.img != null){
         img = <img className="project__img" src={`/images/` + this.props.img} alt="Project" />
        }
    return(
        <>
          <div className="project__wrapper">     
        <h2 className="project__title" >{this.props.title}</h2>
        <ul className="project__ul">
            {this.props.code.map(codes => (
                <li className="project__li">{codes}</li>
            ))}
        </ul>
        <div className="project__paragraph">
            <p >{this.props.paragraphOne}</p>
            <br />
            <p >{this.props.paragraphTwo}</p>
            </div>
            </div>
            {img}
            {github}
            {site}
        </>
    )}
}

export default Project