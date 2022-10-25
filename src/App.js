import Header from "./Components/Header/Header"
import './App.css';
import React from 'react'
import Experience from "./Components/Experience/Experience";
import Section from "./Components/Section/Section";
import Navigation from "./Components/Navigation/Navigation";
import Mail from "./Components/Mail/Mail";
import Footer from "./Components/Footer/Footer";

class App extends React.Component{

  constructor(props){
    super(props)
    this.state = {name: 'Raphael Rebel'}
  }

  
  render(){
   let updatedName = () => {
      return  'test'
    }
  return (
    <div className="App">
      
      <Navigation name={this.state.name} updated={updatedName}/>
      <Header name={updatedName} />
      <Section title="2,5 jaar ervaring in code">
        <Experience />
      </Section>

      <Section title="Contact">
        <Mail />
      </Section>
      <Footer />
    </div>
  );}
}

export default App;
