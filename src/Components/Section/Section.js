
import "./Section.css"
import { useEffect, useRef, React, useState } from 'react'

const Section = (props) => {



    // useEffect(() => {
    //     const observer = new IntersectionObserver(
    //         function(entries){
    //             if(entries[0].isIntersecting === true){
    //                 console.log("f");
    //             }
    //         });

    //     observer.observe(document.querySelector(".section"));
    //     return () => {
    //         observer.disconnect();
    //     }
    // },[]);

    return (
        <div className="section">
            <h2  className="section__header">{props.title || ""}</h2>
            <div >
                {props.children}
            </div>
        </div>
    )
}

export default Section