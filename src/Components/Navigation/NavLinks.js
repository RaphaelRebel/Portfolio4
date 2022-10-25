import "./Navigation.css"

const NavLinks = (props) => {
         return(
                 
                  <ul className="nav__ul">
                  <h3 onClick={props.updated()} className="nav__h3"> <a  href="/"> {props.name}</a></h3>
                  <li className="nav__li">Gallerij</li>
                           
                  </ul>
         
         )
}

export default NavLinks