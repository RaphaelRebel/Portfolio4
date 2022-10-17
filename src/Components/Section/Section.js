import "./Section.css"

const Section = (props) => {
     return(
        <section className="section">
    <h2 className="section__header">{props.title || ""}</h2>
        {props.children}
        </section>
        )
}

export default Section