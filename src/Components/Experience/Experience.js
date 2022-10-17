import "./Experience.css"
import ExperiencePart from "../Experience__part/ExperiencePart"

const Experience = () => {
    return (
        <div className="experience">
            <section className="experience__total">
                <h2>
                    2,5 jaar 
                </h2>
                <h2>ervaring in code</h2> <br />
                <p className="experience__total-p">Voordat ik op mijn codeer opleiding terecht kwam, wist ik al dat ik een web developer wilde worden. Ik was al een beetje begonnen, maar ik leerde pas echt coderen toen ik op de het <a href="https://www.ma-web.nl/" className="ma">Media college</a> terecht kwam. <br /> <br /> Momenteel heb ik </p>
            </section>
            <section className="experience__allPart">
              
                <ExperiencePart title="2,5 jaar" subject="ervaring in SCRUM" />
                <ExperiencePart title="2 jaar" subject="ervaring in back-end" />
                <ExperiencePart title="2 jaar" subject="ervaring in PHP" />
                <ExperiencePart title="1 jaar" subject="van Laravel ervaring" />
                <ExperiencePart title="Net begonnen" subject="met ReactJS" />
            </section>
        </div>
    )
}

export default Experience