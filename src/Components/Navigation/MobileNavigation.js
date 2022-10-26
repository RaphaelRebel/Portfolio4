import NavLinks from "./NavLinks"
import "./Navigation.css"
import {HiMenuAlt1} from "react-icons/hi"
import { useState } from "react"
import {IoIosCloseCircleOutline} from "react-icons/io"

const MobileNavigation = (props) => {

  const  [open, setOpen] = useState(false);

  const hamburgerIcon = <HiMenuAlt1 className="hamburger" size='40px' color='white' onClick={() => setOpen(!open)} />
  const closeIcon = <IoIosCloseCircleOutline className="hamburger" size='40px' color='white' onClick={() => setOpen(!open)} />

  const closeMobileMenu = () => setOpen(false);


    return(
        <div className="mobileNavigation" >
            {open ? closeIcon : hamburgerIcon}
           { open && <NavLinks isMobile={true} closeMobileMenu={closeMobileMenu}  updated={props.updated} name={props.name}/>}
         
        </div>
    )
}

export default MobileNavigation