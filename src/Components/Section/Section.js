import "./Section.css"
import {useEffect, React} from 'react'

const Section = (props) => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            function(entries){
                if(entries[0].isIntersecting === true){
                    console.log("f");
                }
            });

        observer.observe(document.querySelector(".section"));
        return () => {
            observer.disconnect();
        }
    },[]);

     return(
        <div  className="section">
    <h2 className="section__header">{props.title || ""}</h2>
        {props.children}
        </div>
        )
}

export default Section