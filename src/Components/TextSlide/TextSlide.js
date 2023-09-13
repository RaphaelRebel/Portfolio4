import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, cubicBezier, circOut, useMotionValue, useMotionValueEvent, Variants, easeIn, transform } from "framer-motion";
import "./TextSlide.css";
// #F0F0F0
// #213555
// #4F709C
// #E5D283
const TextSlide = (props) => {
const [vhOpacity, setVhOpacity] = useState(0)
    const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"]
  });
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setVhOpacity(latest)
})

const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.6, 0.8], [0, 1, 1, 0])

  return (
    <section className="TextSlide_parent">
        
      <motion.div
      className="TextSlide"
      style={{opacity: opacity}}
      ref={ref}>
        <p>{props.TextSlide}</p>
      </motion.div>
    </section>
  );
}

export default TextSlide;
