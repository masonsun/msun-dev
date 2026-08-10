import { Children } from "react";
import { motion } from "framer-motion";

const EASING = [0.4, 0, 0.2, 1];

const ListVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      ease: EASING,
      duration: 0.5,
    },
  },
};

const ListItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASING },
  },
};

const MotionBlurb = ({ children, open }) => {
  return (
    <motion.ul
      variants={ListVariants}
      initial="hidden"
      animate={open ? "visible" : "hidden"}
    >
      {Children.map(children, (child) => (
        <motion.div variants={ListItemVariants}>{child}</motion.div>
      ))}
    </motion.ul>
  );
};

export default MotionBlurb;
