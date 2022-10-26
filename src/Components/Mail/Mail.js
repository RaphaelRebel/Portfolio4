import "./Mail.css"

const Mail = () => {
         return(
                  <section className="allContact">
                  <div className="mail">
                  <h3 className="mail__p">Heb je nog vragen?</h3>
                  <a className="mail__a" href="mailto:raphaelrebel@live.com">Mail me</a>
                  </div>
                  <div className="contact">
                           <h3>Of vind hier mijn informatie.</h3>
                           <ul className="contact__ul">
                           <li className="contact__li">Tel: <a href="tel:+0693541751">+31 6 83 54 17 51</a></li>
                           <li className="contact__li">E-mail: <a href="mailto:raphaelrebel@live.com">Raphaelrebel@live.com</a></li>
                           <li className="contact__li"><a href="https://www.linkedin.com/in/raphael-rebel-7030b6214/">Linkedin</a></li>
                           </ul>
                  </div>
                  </section>
         )
}

export default Mail