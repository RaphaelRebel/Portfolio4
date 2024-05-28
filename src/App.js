
import './App.css';
import React, { Suspense } from 'react'
import Experience from "./Components/Experience/Experience";
import Section from "./Components/Section/Section";
import Navigation from "./Components/Navigation/Navigation";
import Mail from "./Components/Mail/Mail";
import Footer from "./Components/Footer/Footer";
import Made from "./Components/Made/Made";
import { BsCaretDownSquare } from "react-icons/bs";
import ProjectPage from "./Components/ProjectPage/ProjectPage";
import RedBar from "./Components/RedBar/RedBar";
import TextSlide from "./Components/TextSlide/TextSlide";
import Intro from "./Components/Intro/Intro";
import SectionAnimated from './Components/SectionAnimated/SectionAnimated';

class App extends React.Component{

  constructor(props){
    super(props)
    this.state = {name: 'Raphael Rebel'}
  }

  

  
  render(){
   let updatedName = () => {
      return  'test'
    }

    const textSlideArray = [
      "Full-stack",
      "Web-development"
  ]
  
  const timeCode = new Date().getFullYear() - 2020;

  const textSlideToBeRendered = textSlideArray.map(textSlide => {
   return( <TextSlide key={textSlide} TextSlide={textSlide} /> )
  })
  return (
    <div className="App">
      {/* <Suspense fallback="loading"></Suspense> */}
      <RedBar />
      {/* <Navigation name={this.state.name} updated={updatedName}/>  */}
      <Section>
        <Intro title={this.state.name} />
      </Section>
      <Section>
    {textSlideToBeRendered}
      </Section>
       {/* <Header name={updatedName} /> */}
       <SectionAnimated >
        <ProjectPage />
       </SectionAnimated>
      <SectionAnimated title={`${timeCode} jaar ervaring in code`}> 
         <Experience />
      </SectionAnimated>
{/* 
      <SectionAnimated title="Hoe is deze website gemaakt?" >
        <Made />
      </SectionAnimated> */}

      <SectionAnimated title="Contact">
        <Mail />
      </SectionAnimated>
      <Footer />
    </div>
  );}
}

export default App;
