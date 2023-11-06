
import "./Info.css"
import Project from "../Project/Project"
import React from "react"



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
            img='Tekton.webp'
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
            img='Fifty-ish.webp'
            code={['Laravel', 'PHP', 'SCRUM', 'Back-end']}
            />;
        } else if (this.props.project === "Reactomon"){
            this.state.state = !this.state.state
            let  state = this.state.state
            newPage = 
            <Project 
            title="Reactomon"
            paragraphOne="Reactomon was gemaakt voor 1 van de opdrachten die we hadden gekregen voor de progammeer lessen. Het idee was dat we een gevecht systeem bouwen met ongeveer dezelfde functies als Pokemon." paragraphTwo="De app was gebouwd met ReactJS. Ik had veel geleerd en heb weer nieuwe goals ingesteld voor de toekomst. Ik wil meer weten over Javascript zodat ik deze app nog leuker kan maken." 
            state={state}
            name="Github"
            link="https://github.com/RaphaelRebel/F3M9reactomon"
            website='Website'
            site='https://reactomon-seven.vercel.app/'
            img='Reactomon.webp'
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
            img='RaphaelRebel3.webp'
            code={['HTML', 'CSS', 'Javascript', 'Design' ]}
            />;
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
            img='Tekton.webp'
            
            />
             
        }

        
    return(
        
        <section className="info">
           
            
            {newPage}
        
        
        </section>
       
    )}
}

export default Info