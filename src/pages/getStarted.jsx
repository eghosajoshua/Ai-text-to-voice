import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function GetStarted({ setLoggedIn }) {
  let navigate = useNavigate();

  let loginUser = async () => {
    setLoggedIn(true);
    navigate("/");
  };

  return (
    <div className="bg-cover  bg-no-repeat bg-center h-full bg-[url(/imgs/aivoice2.png)]">
      <div className="absolute bg-black top-0 opacity-10 left-0 h-[100vh] w-[100vw]"></div>

      <div className="absolute items-end p-8 flex bg-gradient-to-b from-transparent to-black top-0 left-0 h-[100vh] w-[100vw]">
        <motion.div
          onClick={() => loginUser()}
          whileTap={{
            scale: 1.1,
          }}
          className="bg-sky-500 w-full p-4 rounded-lg   mx-auto h-fit"
        >
          <p className="font-bold text-xl text-center">Get Started</p>
        </motion.div>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default GetStarted;
