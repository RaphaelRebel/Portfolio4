import "./Section.css"

const Section = (props) => {
     return(
        <div className="section">
    <h2 className="section__header">{props.title || ""}</h2>
        {props.children}
        </div>
        )
}

export default Section