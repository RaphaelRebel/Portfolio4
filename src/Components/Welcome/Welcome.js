

import "./Welcome.css"

const Welcome = (props) => {
    return(
        <>
            <h1 >{props.title}</h1>
            <div className="welcome__paragraph">
            <p >{props.paragraphOne}</p>
            <br />
            <p >{props.paragraphTwo}</p>
            </div>
        </>
    )
}

export default Welcome