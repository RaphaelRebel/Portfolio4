import { motion } from "framer-motion";
import "./Intro.css";

const Intro = (props) => {
  const title = Array.from(props.title);
  const subTitle = Array.from("Made  in  Amsterdam");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
    },
  };

  const subChild = {
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 30,
      x: -30,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const map = {
    visible: {
      opacity: 1,
      boxShadow: "80px -30px 15px 5px rgba(0,0,0,0.4)",
    },

    hidden: {
      opacity: 0,
      boxShadow: "0",
    },
  };

  return (
    <motion.div
      variants={container}
      style={{  }}
      initial="hidden"
      animate="visible"
      className="intro_container"
    >
      <div className="intro">
        <div className="intro_title">
          {title.map((word, index) => (
            <motion.h1
              variants={child}
              className="intro_h1"
              style={{ marginRight: "1vw" }}
              key={index}
            >
              {word}
            </motion.h1>
          ))}
        </div>

        <div className="intro_amsterdam">
          <div style={{ display: "flex" }}>
            {subTitle.map((word, index) => (
              <motion.p
                variants={subChild}
                style={{ marginRight: "0.1vw", fontSize: 34 }}
                key={index}
              >
                {word}
              </motion.p>
            ))}
          </div>

          <motion.img
            className="intro_amsterdam-img"
            src={"/images/Amterdam_Centrum_White_A4.png"}
            alt="Raphael Rebel"
            variants={map}
            transition={{ duration: 2 }}
          />
        </div>
      </div>
      <motion.img
        className="welcome__img"
        src={"/images/IMG_9947.jpeg"}
        alt="Raphael Rebel"
        initial={{ y: 20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          boxShadow: "2rem 2rem 0.5rem rgba(0,0,0,0.5)",
        }}
        transition={{ duration: 0.8, delay: 1, ease: [0, 0.2, 0.7, 1] }}
      />

      <ul>
        <motion.li></motion.li>
      </ul>
    </motion.div>
  );
};

export default Intro;
