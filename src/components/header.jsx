import React from "react";
import { TbMenu } from "react-icons/tb";
import { motion } from "framer-motion";

function Header({ setOpenSideBar }) {
  return (
    <div className="dark:bg-slate-900 sticky top-0">
      <div className="flex items-center justify-between p-5 max-w-lg mx-auto">
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
    </div>
  );
}

export default Header;
