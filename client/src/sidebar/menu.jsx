import { useRef } from "react";
import { motion, useCycle } from "framer-motion/dist/framer-motion";
import { useDimensions } from "./use-dimensions";
import { MenuToggle } from "./menutoggle";
import { Navigation } from "./navigation";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};

export const Menu = ({id}) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <motion.nav className="sidebar"
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <motion.div className="background-sidebar" variants={sidebar} />
      <Navigation id={id} />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};
