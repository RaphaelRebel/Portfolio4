import "./Navigation.css"
import NavLinks from "./NavLinks"

const Navigation = (props) => {
         return(
                  <nav className="nav">
                       <NavLinks updated={props.updated()}/>
                  </nav>
         )
}

export default Navigation