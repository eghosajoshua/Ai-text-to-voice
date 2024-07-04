import React, { useState } from "react";
import SmallHeader from "../components/small_header";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

function ActivateApp() {
  const [showCancelSub, setShowCancelSub] = useState(false);
  return (
    <>
      <SmallHeader link={"/"} title={"Home"} />

      <div className="p-4 flex flex-col flex-1 overflow-y-scroll">
        <h1 className="dark:text-slate-200 text-2xl text-center font-bold">
          Ugrade to premium
        </h1>
        <div className="dark:bg-slate-800 bg-white my-4 p-4 shadow-lg rounded-lg flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <FaCheckCircle color="limegreen" />
            <p className="font-bold dark:text-slate-200">
              1500 free credit every 2 days
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <FaCheckCircle color="limegreen" />
            <p className="font-bold dark:text-slate-200">
              Commercial use of voices
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <FaCheckCircle color="limegreen" />
            <p className="font-bold dark:text-slate-200">Unlock all voices</p>
          </div>
          <div className="flex gap-2 items-center">
            <FaCheckCircle color="limegreen" />
            <p className="font-bold dark:text-slate-200">No Ads</p>
          </div>
        </div>
        <motion.div
          whileTap={{ scale: 1.05 }}
          className="bg-sky-600 mt-6 p-4 flex items-center justify-center rounded-full"
        >
          <p className="text-slate-200 font-semibold text-xl">$1.99 / week</p>
        </motion.div>
        <motion.div
          whileTap={{ scale: 1.05 }}
          className="bg-sky-600 mt-4 p-4 flex items-center justify-center rounded-full"
        >
          <p className="text-slate-200 font-semibold text-xl">
            $5.99 / month <span className="text-green-400">( save +$2 )</span>
          </p>
        </motion.div>
        <motion.div
          whileTap={{ scale: 1.05 }}
          className="bg-sky-600 mt-4 p-4 flex items-center justify-center rounded-full"
        >
          <p className="text-slate-200 font-semibold text-xl">
            $59.99 / year <span className="text-green-400">( save +$35 )</span>
          </p>
        </motion.div>
        <div className="flex-1"></div>

        <div
          onClick={() => setShowCancelSub((former) => !former)}
          className="py-2 "
        >
          <p className="text-gray-400 text-center">Cancel Subscription</p>
          {showCancelSub && (
            <p className="text-gray-500 text-center">
              To cancel your Subscription head to google play store , under app
              and games, the select ai voice and cancel subscription
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default ActivateApp;
