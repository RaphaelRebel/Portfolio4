import "./Section.css"

const Section = (props) => {
    const hide = document.querySelectorAll(".section")
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          entry.target.classList.toggle("show", entry.isIntersecting)
        })
      },
      {
        threshold: 1, 
      }
      )
      hide.forEach(hid => {
        observer.observe(hid)
      })
     return(
        <div className="section">
    <h2 className="section__header">{props.title || ""}</h2>
        {props.children}
        </div>
        )
}

export default Section