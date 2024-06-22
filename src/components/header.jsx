import React from "react";
import { TbMenu } from "react-icons/tb";
import { motion } from "framer-motion";

function Header({ setOpenSideBar }) {
  return (
    <div className="dark:bg-slate-900 bg-white w-full shadow-md flex justify-between  p-5 items-center">
      <motion.div
        whileTap={{
          scale: 1.5,
          rotateZ: 180,
          transition: { duration: 0.1 },
        }}
      >
        <TbMenu
          onClick={() => setOpenSideBar(true)}
          size={24}
          className="dark:text-slate-200"
        />
      </motion.div>
      <p className="font-bold text-lg dark:text-slate-200">
        Ai Voice generator
      </p>
    </div>
  );
}

export default Header;
