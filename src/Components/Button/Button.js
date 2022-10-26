import "./Button.css"

const Button = (props) => {
         return(
                  <button className="button"><a target='_blank' href={props.link}>{props.name}</a></button>
         )
}

export default Button 