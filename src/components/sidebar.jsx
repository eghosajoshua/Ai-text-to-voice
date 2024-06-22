import React from "react";
import { motion, AnimatePresence, transform } from "framer-motion";
import { FaApper, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal2 from "sweetalert2";
import { FaCoins } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { setWebString } from "../utils/bridge";

function SideBar({ setOpenSideBar, setLoggedIn }) {
  let navigate = useNavigate();

  let logOut = () => {
    Swal2.fire({
      title: "Do you want to log out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        setWebString("");
        navigate("/#/get-started");
        setLoggedIn(false);
      }
    });
  };
  return (
    <div className="w-[100vw] h-[100vh] fixed top-0 left-0 ">
      {/* overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8, transition: { type: "tween", delay: 0.1 } }}
        exit={{ opacity: 0 }}
        onClick={() => setOpenSideBar(false)}
        className="bg-black opacity-80 w-full h-full"
      ></motion.div>
      {/* side */}
      <motion.div
        initial={{ x: "-100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { type: "tween" } }}
        exit={{ opacity: 0, x: "-100vw" }}
        className="bg-white dark:bg-slate-900 h-full w-[80%] max-w-[6 s00px] absolute left-0 top-0 flex flex-col"
      >
        <div className="p-5 py-10 bg-sky-500">
          <p>Ai Voice</p>
          <p>{localStorage.getItem("user")}</p>
        </div>
        <div className="mt-4 flex flex-1 flex-col gap-5 overflow-y-scroll">
          <div className="flex gap-3 mr-6 rounded-tr-full rounded-br-full  items-center p-4 bg-slate-800">
            <FaHome size={24} className="dark:text-slate-200 text-white" />
            <p className="text-lg text-white dark:text-slate-200">Home</p>
          </div>
          <Link
            to={"/buy-credit"}
            className="flex gap-3 items-center mr-6 rounded-tr-full rounded-br-full p-4"
          >
            <FaCoins size={24} className="dark:text-slate-200" />
            <p className="text-lg dark:text-slate-200">Purchase credit</p>
          </Link>
          <Link
            to={"/upgrade-premium"}
            className="flex gap-3 items-center mr-6 rounded-tr-full rounded-br-full p-4"
          >
            <FaApper size={24} className="dark:text-slate-200" />
            <p className="text-lg dark:text-slate-200">Upgrade to Premium</p>
          </Link>
          <div className="flex gap-3 items-center mr-6 rounded-tr-full rounded-br-full p-4">
            <FaHome size={24} className="dark:text-slate-200" />
            <p className="text-lg dark:text-slate-200">Restore purchases</p>
          </div>
          <div
            onClick={() => setWebString("privacy-policy")}
            className="flex gap-3 items-center mr-6 rounded-tr-full rounded-br-full p-4"
          >
            <FaHome size={24} className="dark:text-slate-200" />
            <p className="text-lg dark:text-slate-200">Privacy Policy</p>
          </div>
          <div className="flex gap-3 items-center p-4 mr-6 rounded-tr-full rounded-br-full">
            <FaHome size={24} className="dark:text-slate-200" />
            <p className="text-lg dark:text-slate-200">Terms and Condition</p>
          </div>
          <div
            onClick={() => logOut()}
            className="flex gap-3 items-center p-4 mr-6 rounded-tr-full rounded-br-full"
          >
            <FaHome size={24} className="dark:text-slate-200" />
            <p className="text-lg dark:text-slate-200">Log out</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default SideBar;
