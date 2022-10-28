import "./Navigation.css"

import React from 'react'

const NavLinks = (props) => {

//          const animateFrom = {opacity: 0, x:200}
//     const animateTo = {opacity: 1, x: 0}
         let update = () => {
               return  props.isMobile && props.closeMobileMenu(), props.updated()
         }
         return(
                 
                  <ul   className="nav__ul navigation__links"  id="mobileNavigation">
                 <li  onClick={ update} className="nav__li"> <h3  className="nav__h3"> <a  href="/"> Raphael Rebel</a></h3></li>
                 {/* <div className="nav__li-wrapper">
                  <motion.li className="nav__li-pages nav__li" initial={animateFrom} animate={animateTo} transition={{delay: 0.05}} onClick={ update}  > <a target='_blank' href="https://github.com/RaphaelRebel/Portfolio4"> Github code</a></motion.li>
                  </div> */}
                  </ul>
         
         )
}

export default NavLinks