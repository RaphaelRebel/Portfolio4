import "./Section.css"
import React from 'react'

const Section = (props) => {
    // const hide = document.querySelectorAll(".section")
    // const observer = new IntersectionObserver(
    //   entries => {
    //     entries.forEach(entry  => {
    //       if(entry.isIntersecting){
    //         entry.target.classList.toggle("show", entry.isIntersecting)
    //       }  
    //     })
    //   },
    //   {
    //     treshold: 1,
    //   }
      // )
      // hide.forEach(hid => {
      //   observer.observe(hid)
      // })
     return(
        <div className="section">
    <h2 className="section__header">{props.title || ""}</h2>
        {props.children}
        </div>
        )
}

export default Section