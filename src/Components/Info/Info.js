import Welcome from "../Welcome/Welcome"
import "./Info.css"
import Project from "../Project/Project"
import React from "react"

import { AnimatePresence } from 'framer-motion/dist/framer-motion'

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
            code={['Wordpress', 'Design']}
            
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
            name='Github'
            link='https://github.com/Joeyvdkuijl/fifty-ish-project'
            code={['Laravel', 'PHP', 'SCRUM', 'Back-end']}
            />;
        } else if (this.props.project === "ForFighters"){
            this.state.state = !this.state.state
            let  state = this.state.state
            newPage = 
            <Project 
            title="ForFighters"
            paragraphOne="Forfighters was een idee over een non-profit website voor mensen die geen sport kleding kunnen kopen. Samen met een klasgenoot zijn we gaan werken aan dit project." paragraphTwo="Dit project was gebouwd in Laravel. Ik werkte aan de back-end van dit project. Ik moest een CMS (content managment system) bouwen zodat de opdrachtgever zelf zijn content kon plaatsen." 
            state={state}
            name='Github'
            link="https://github.com/RaphaelRebel/ForFighters" 
            code={['Laravel', 'PHP', 'Back-end']}
            />
            
        }else if (this.props.project === "Reactomon"){
            this.state.state = !this.state.state
            let  state = this.state.state
            newPage = 
            <Project 
            title="Reactomon"
            paragraphOne="Reactomon was gemaakt voor 1 van de opdrachten die we hadden gekregen voor de progammeer lessen. Het idee was dat we een gevecht systeem bouwen met ongeveer dezelfde functies als Pokemon." paragraphTwo="De app was gebouwd met ReactJS. Ik had veel geleerd en heb weer nieuwe goals ingesteld voor de toekomst. Ik wil meer weten over Javascript zodat ik deze app nog leuker kan maken." 
            state={state}
            name="Github"
            link="https://github.com/RaphaelRebel/F3M9reactomon"
            code={['ReactJS', 'CSS']}
            />;
        }else if (this.props.project === "RaphaelRebel3"){
            this.state.state = !this.state.state
            let  state = this.state.state
            newPage = 
            <Project 
            title="RaphaelRebel3"
            paragraphOne="Dit was mijn derde portfolio website. De website was door mij ontworpen en gebouwd. Ik wilde een simpele one-pager waar je genoeg informatie kan vinden over mij." paragraphTwo="Dit project was met HTML, CSS en Javascript gebouwd. Het was niet dat ik dit wilde, maar ik had nog geen kennis met React, of een andere taal waarmee ik aan de front-end kon werken. Ik was blij met hoe het eruit zag (naast de portfolio sectie.) Maar de layout zat niet goed in elkaar. Waardoor ik toch had besloten dat ik beter een nieuwe portfolio website kon gaan bouwen." 
            state={state}
            name="Github"
            link="https://github.com/RaphaelRebel/F3M9reactomon"
            website='Website'
            site='http://22503.hosts1.ma-cloud.nl/raphaelrebel_2/'
            code={['HTML', 'CSS', 'Javascript', 'Design' ]}
            />;
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
            this.state.state = !this.state.state
            let  state = this.state.state
            newPage =     <Project 
            title="Tekton" 
            paragraphOne="Terug in 2021 was ik begonnen met het zoeken van opdrachten. Tekton was het eerste bedrijf waar ik naartoe ekon gaan om een website voor te bouwen. Dit was de start van mijn ZZP bedrijf genaamd 'Rebootz'. Ik heb veel geleerd over hoe ik om moet gaan met zaken."
            paragraphTwo="Dit project was met Wordpress gemaakt. Ik begon meer op de front-end te focussen en het design, omdat dat natuurlijk ook gedaan moest worden. Ik kon eindelijk mijn schoolervaring overbrengen naar een zakelijk project."
            state={state}
            code={['Wordpress', 'Design']}
            
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