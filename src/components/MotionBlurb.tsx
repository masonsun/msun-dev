import { Children } from "react";
import { motion } from "framer-motion";

const ListVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
};

const ListItemVariants = {
  hidden: {
    opacity: 0,
    y: "100%",
  },
  visible: {
    opacity: 1,
    y: 0,
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
