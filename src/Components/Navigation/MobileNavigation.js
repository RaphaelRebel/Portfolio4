import NavLinks from "./NavLinks"
import "./Navigatie.css"
import {HiMenuAlt1} from "react-icons/hi"
import { useState } from "react"
import {IoIosCloseCircleOutline} from "react-icons/io"

const MobileNavigation = () => {

  const  [open, setOpen] = useState(false);

  const hamburgerIcon = <HiMenuAlt1 className="hamburger" size='40px' color='white' onClick={() => setOpen(!open)} />
  const closeIcon = <IoIosCloseCircleOutline className="hamburger" size='40px' color='white' onClick={() => setOpen(!open)} />

  const closeMobileMenu = () => setOpen(false);


    return(
        <div className="mobileNavigation" >
             <figure class="navigation__figure__mobile">
        <i class="fa-solid fa-book-open-reader navigation__icon"></i>
        </figure>
            {open ? closeIcon : hamburgerIcon}
           { open && <NavLinks isMobile={true} closeMobileMenu={closeMobileMenu} />}
        </div>
    )
}

export default MobileNavigation