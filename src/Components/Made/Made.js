import MadeArticle from '../MadeArticle/MadeArticle'
import './Made.css'


const Made = () => {
         return(
                  <div className='made'>
                  <p className='made__p'>Deze website is gebouwd in ReactJS. Ik heb dit gebouwd zodat de website heel makkelijk herbouwd kan worden of zodat er nog meer informatie toegevoegd kan worden. <br /> <br /> Wat is er speciaal aan deze website? </p>
                  <div className="madeWrapper">
                  <MadeArticle text="Er is een navigatie klaargezet voor toekomstige gebruik" number="1" />
                  <MadeArticle text="Er kan altijd een project toegevoegd worden in de projectenlijst " number="2" />
                  <MadeArticle text="Alle componenten kunnen snel toegevoegd worden met weinig code" number="3" />
                  </div>
                  </div>
         )
}

export default Made