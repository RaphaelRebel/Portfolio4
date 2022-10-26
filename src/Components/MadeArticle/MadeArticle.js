import "./MadeArticle.css"

const MadeArticle = (props) => {
         return(
                  <article className="madeArticle">
                           <section className="madeArticle__top">
                                    <header><h3>{props.number}</h3></header>
                           </section>
                           <section className="madeArticle__bottom">
                                    
                                    <p>{props.text}</p>
                           </section>
                  </article>
         )
}

export default MadeArticle