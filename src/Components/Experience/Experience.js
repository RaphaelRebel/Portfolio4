import "./Experience.css"
import ExperiencePart from "../Experience__part/ExperiencePart"
import {AiFillHtml5} from "react-icons/ai"
import {BsFileEarmarkCode} from "react-icons/bs"
import {DiCss3} from "react-icons/di"
import {DiScrum} from "react-icons/di"
import {DiPhp} from "react-icons/di"
import {FaLaravel} from "react-icons/fa"
import {DiReact} from "react-icons/di"
import React from 'react'
const Experience = () => {

    let html = <figure className="experience__figure"><AiFillHtml5 /></figure>
    let backEnd = <figure className="experience__figure"><BsFileEarmarkCode /></figure>
    let css = <figure className="experience__figure"><DiCss3 /></figure>
    let scrum = <figure className="experience__figure"><DiScrum /></figure>
    let php =  <figure className="experience__figure"><DiPhp /></figure>
    let laravel = <figure className="experience__figure"><FaLaravel /></figure>
    let react = <figure className="experience__figure"><DiReact /></figure>

  let date = new Date().getFullYear();
  let backEndCounter = new Date().getFullYear() - 2020 + " jaar";
  let cssCounter = new Date().getFullYear() - 2020 + " jaar";
  let scrumCounter = new Date().getFullYear() - 2020 + " jaar";
  let phpCounter = new Date().getFullYear() - 2020 + " jaar";
  let laravelCounter = new Date().getFullYear() - 2021 + " jaar";
  let reactCounter = new Date().getFullYear() - 2022 + " jaar";
  let htmlCounter = new Date().getFullYear() - 2020 + " jaar";


    return (
        <div className="experience ">
            <section className="experience__total">
                <p className="experience__total-p">Voordat ik op mijn codeer opleiding terecht kwam, wist ik al dat ik een web developer wilde worden. Ik was al een beetje begonnen, maar ik leerde pas echt coderen toen ik op de het <a href="https://www.ma-web.nl/" target="_blank" className="ma">Mediacollege</a> terecht kwam. <br /> <br /> Momenteel heb ik ervaring in: </p>
            </section>
            <section className="experience__allPart">
                <ExperiencePart subject={htmlCounter} title="HTML" icon={html}/>
                <ExperiencePart subject={cssCounter} title="CSS" icon={css}/>
                <ExperiencePart subject={scrumCounter} title="SCRUM" icon={scrum}/>
                <ExperiencePart subject={backEndCounter} title="back-end" icon={backEnd}/>
                <ExperiencePart subject={phpCounter} title="PHP" icon={php}/>
                <ExperiencePart subject={laravelCounter} title="Laravel" icon={laravel}/>
                <ExperiencePart subject={reactCounter} title=" ReactJS" icon={react} />
                
            </section>
        </div>
    )
}

export default Experience