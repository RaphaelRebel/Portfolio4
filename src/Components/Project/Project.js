import "./Project.css"
import React from 'react'
import {motion} from "framer-motion"
import { render } from "@testing-library/react"

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
     

       
    return(
        <>
               
        <h2 className="project__title" >{this.props.title}</h2>
        <div className="project__paragraph">
            <p >{this.props.paragraphOne}</p>
            <br />
            <p >{this.props.paragraphTwo}</p>
            </div>

        </>
    )}
}

export default Project