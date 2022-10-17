import Welcome from "../Welcome/Welcome"
import "./Info.css"
import Project from "../Project/Project"
import React from "react"

import {AnimatePresence} from "framer-motion"

class Info extends React.Component{
    
  constructor(props){
    super(props)

    this.state = {state: false}
    
  }

  
  
  render(){
     

        

        let newPage = null ; 
        if(this.props.project === "Tekton"){
            this.state.state = !this.state.state
         let  state = this.state.state
            newPage = 
             
            <Project 
            title="Tekton" 
            paragraphOne="Terug in 2021 was ik begonnen met het zoeken van opdrachten. Tekton was het eerste bedrijf waar ik naartoe ekon gaan om een website voor te bouwen. Dit was de start van mijn ZZP bedrijf genaamd 'Rebootz'. Ik heb veel geleerd over hoe ik om moet gaan met zaken."
            paragraphTwo="Dit project was met Wordpress gemaakt. Ik begon meer op de front-end te focussen en het design, omdat dat natuurlijk ook gedaan moest worden. Ik kon eindelijk mijn schoolervaring overbrengen naar een zakelijk project."
            state={state}
            />
           ;
        } else if (this.props.project === "Fifty-ish"){
            this.state.state = !this.state.state
            let  state = this.state.state
            newPage = 
            <Project 
            title="Fifty-ish" 
            paragraphOne="Dit project was een schoolproject op examen-niveau. Het project werd gemaakt door een team van drie mensen, waarvan ik aan het controlen systeem zou werken. "
            paragraphTwo="Dit was het laatste schoolproject waar ik met Laravel aan werkte. Hiervoor had ik al een half jaar aan ervaring met de taal en nu kon ik laten zien hoever ik was gekomen. Ik zag zelf een grootte sprong in ervaring."
            state={state}
            />;
        } else if (this.props.project === "ForFighters"){
            this.state.state = !this.state.state
            let  state = this.state.state
            newPage = 
            <Project 
            title="ForFighters"
            paragraphOne="Forfighters was een idee over een non-profit website voor mensen die geen sport kleding kunnen kopen." />;
            state={state}
        }else if (this.props.project === "Todo"){
            this.state.state = !this.state.state
            let  state = this.state.state
            newPage = 
            <Project 
            title="Todo"
            paragraphOne="" 
            state={state}/>;
        }else if(this.props.name === true){
            
            this.state.state = !this.state.state
            let  state = this.state.state
            newPage =   <Welcome 
            title="Welkom"
            paragraphOne="Mijn naam is Raphael Rebel. Ik ben een full-stack webdeveloper. Mijn meeste ervaring ligt in Laravel, maar sinds kort ben ik ook begonnen aan ReactJS."
            paragraphTwo="Ik ben altijd benieuwd naar nieuwe ideeën voor websites. Ik hou zowel van het stylen van een website, als de database in een website in elkaar zetten."
            
            state={state}/>
        }
        else{
            newPage =   <Welcome 
            title="Welkom"
            paragraphOne="Mijn naam is Raphael Rebel. Ik ben een full-stack webdeveloper. Mijn meeste ervaring ligt in Laravel, maar sinds kort ben ik ook begonnen aan ReactJS."
            paragraphTwo="Ik ben altijd benieuwd naar nieuwe ideeën voor websites. Ik hou zowel van het stylen van een website, als de database in een website in elkaar zetten."
             />
        }

        
    return(
        <section className="info">
            <AnimatePresence>
            
            {newPage}
        
         </AnimatePresence>
        </section>
    )}
}

export default Info