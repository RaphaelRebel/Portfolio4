import Header from "./Components/Header/Header"
import './App.css';
import React from 'react'
import Experience from "./Components/Experience/Experience";
import Section from "./Components/Section/Section";
import Navigation from "./Components/Navigation/Navigation";

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
      <Section>
        <Experience />
      </Section>
      
    </div>
  );}
}

export default App;
