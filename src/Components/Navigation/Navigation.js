import "./Navigation.css"

const Navigation = (props) => {
         return(
                  <nav className="nav">
                           <h3 onClick={props.updated()} className="nav__h3"> <a  href="/"> {props.name}</a></h3>
                  </nav>
         )
}

export default Navigation