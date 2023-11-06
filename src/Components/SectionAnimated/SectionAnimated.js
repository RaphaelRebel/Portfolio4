
import "./SectionAnimated.css"
import { useEffect, useRef, React, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, easeIn } from "framer-motion";

const SectionAnimated = (props) => {


    const [vhOpacity, setVhOpacity] = useState(0)
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "start start"]
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        console.log(latest)
        setVhOpacity(latest)
    })

    const opacity = useTransform(
        scrollYProgress,
        [0.3, 0.4, 0.9, 1.5],
        [0, 1, 1, 0]
    )
    // const scale = useTransform(scrollYProgress, [0, 0.2], [0.4, 1])
    const y = useTransform(
        scrollYProgress,
        [0, 0.3, 0.8, 0.9],
        [50, 0, 20, 50]
    )


    return (
        <motion.div ref={ref} style={{opacity, y,  overflow: "hidden", display: "flex", flexDirection: "column"}} className="SectionAnimated">
            <motion.h2 className="SectionAnimated__header">{props.title || ""}</motion.h2>
            <motion.div >
                {props.children}
            </motion.div>
        </motion.div>
    )
}

export default SectionAnimated