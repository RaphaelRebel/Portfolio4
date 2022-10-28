import "./Header.css"
import Info from "../Info/Info"
import ProjectsNav from "../ProjectsNav/ProjectsNav"
import Project from "../Project/Project"
import Welcome from "../Welcome/Welcome"
import { useState, useEffect } from "react"
import React from "react"



class Header extends React.Component {

    constructor(props) {
        super(props)
    }



    

    

    render() {


      
        return (
            
            <header className="header">
                
                <Welcome 
            title="Welkom"
            paragraphOne="Mijn naam is Raphael Rebel. Ik ben een full-stack webdeveloper. Mijn meeste ervaring ligt in Laravel, maar sinds kort ben ik ook begonnen aan ReactJS."
            paragraphTwo="Ik ben altijd benieuwd naar nieuwe ideeën voor websites. Ik hou zowel van het stylen van een website, als de database in een website in elkaar zetten."
             />

                
            </header>
        )
    }
}

export default Header
