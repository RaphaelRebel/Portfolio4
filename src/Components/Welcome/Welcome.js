import React from 'react'

import "./Welcome.css"

const Welcome = (props) => {
    return(
        <section className='welcome'>
            <div>
                <h1 >{props.title}</h1>
                <div className="welcome__paragraph">
                    <p >{props.paragraphOne}</p>
                    <br />
                    <p >{props.paragraphTwo}</p>
                </div>
            </div>
            <img className='welcome__img' src={'/images/RaphaelRebel.webp'} alt="Raphael Rebel" />
        </section>
    )
}

export default Welcome