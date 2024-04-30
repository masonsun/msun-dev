import { Children } from "react";
import { motion } from "framer-motion";
import { proxy } from "valtio";
import { useProxy } from "valtio/utils";

const store = proxy({
  open: true,
});

const ListVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      staggerChildren: 0.05,
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

// @ts-ignore
const MotionBlurb = ({ children, open }) => {
  return (
    <motion.ul
      variants={ListVariants}
      initial="hidden"
      animate={open ? "visible" : "hidden"}
    >
      {Children.map(children, (child) => (
        <li>
          <motion.div variants={ListItemVariants}>{child}</motion.div>
        </li>
      ))}
    </motion.ul>
  );
};

export function HeroText() {
  const state = useProxy(store);
  return (
    <div className="blurb">
      <img src="imgs/head.svg" height="200px" />
      <MotionBlurb open={state.open}>
        <h3>Hello there!</h3>
        <h4>Welcome to Mason's corner on the internet.</h4>
      </MotionBlurb>
    </div>
  );
}

export default HeroText;
