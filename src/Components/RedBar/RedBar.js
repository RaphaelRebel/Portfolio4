import "./RedBar.css"
import { motion, useScroll, useSpring } from "framer-motion"

const RedBar = () => {

    console.log(window.outerHeight)

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="RedBar"
            style={{ scaleX }}
        >

        </motion.div>
    )
}

export default RedBar