import "./Experience.css"
import ExperiencePart from "../Experience__part/ExperiencePart"

const Experience = () => {
    return (
        <div className="experience">
            <section className="experience__total">
                {/* <h2>
                    2,5 jaar 
                </h2>
                <h2>ervaring in code</h2> <br /> */}
                <p className="experience__total-p">Voordat ik op mijn codeer opleiding terecht kwam, wist ik al dat ik een web developer wilde worden. Ik was al een beetje begonnen, maar ik leerde pas echt coderen toen ik op de het <a href="https://www.ma-web.nl/" target="_blank" className="ma">Mediacollege</a> terecht kwam. <br /> <br /> Momenteel heb ik: </p>
            </section>
            <section className="experience__allPart">
              
                <ExperiencePart subject="2,5 jaar" title="ervaring in SCRUM" />
                <ExperiencePart subject="2 jaar" title="ervaring in back-end" />
                <ExperiencePart subject="2 jaar" title="ervaring in PHP" />
                <ExperiencePart subject="1 jaar" title="van Laravel ervaring" />
                <ExperiencePart subject="Net begonnen" title="met ReactJS" />
                <ExperiencePart subject="Net begonnen" title="met ReactJS" />
                <ExperiencePart subject="Net begonnen" title="met ReactJS" />
                <ExperiencePart subject="Net begonnen" title="met ReactJS" />
                <ExperiencePart subject="Net begonnen" title="met ReactJS" />
                <ExperiencePart subject="Net begonnen" title="met ReactJS" />
                <ExperiencePart subject="Net begonnen" title="met ReactJS" />
                <ExperiencePart subject="Net begonnen" title="met ReactJS" />
                <ExperiencePart subject="Net begonnen" title="met ReactJS" />
            </section>
        </div>
    )
}

export default Experience