import React, { useEffect , useState} from "react";
import SmallHeader from "../components/small_header";
import { motion } from "framer-motion";
import { setWebString, getWebString } from "../utils/bridge";
import { toast } from "react-toastify";
import supabase from "../scripts/supabase";

function BuyCredit() {
  let [previousWebString, setPreviousWebString] = useState("");

  //monitor webString Changes
  useEffect(() => {
    let stringChecker = setInterval(() => {
      if (getWebString() != null) {
        if (previousWebString != getWebString()) {
          setPreviousWebString("");
          let creditBought = getWebString();
          if (creditBought.indexOf("creditsuccess") >= 0) {
            let credit = parseInt(creditBought.split("-")[1]);
            creditUser(credit);
          }
        }
      }
    }, 500);

    return () => clearInterval(stringChecker);
  }, []);


  let creditUser = async (val) => {
    toast.success("credited " + val);
    let { data, error } = supabase
      .from("users")
      .select()
      .eq("email", localStorage.getItem("user"));
    if (error == null) {
      let user = data[0];
      let currentCredit = user.credit;
      let newCredit = currentCredit + val;

      let { error } = supabase
        .from("users")
        .update({ credit: newCredit })
        .eq("email", localStorage.getItem("user"));

      if (error == null) {
        toast.success("credit added successfully");
      } else {
        toast.error("something went wrong");
      }
    } else {
      toast.error("something went wrong");
    }
  };

  let getCredit = (val) => {
    setWebString("get" + val + "credits");
  };
  return (
    <>
      <SmallHeader title={"Home"} link={"/"} />
      <div className="p-4 flex flex-col flex-1 gap-4 overflow-y-scroll">
        <h1 className="dark:text-slate-200 text-2xl text-center font-bold">
          Purchase Credit
        </h1>
        <motion.div
          onClick={() => getCredit(1000)}
          whileTap={{ scale: 1.05 }}
          className="bg-slate-900 p-4 rounded-lg justify-between shadow-lg flex items-center"
        >
          <div>
            <p className="font-bold text-white text-2xl">+1,000 Credits</p>
            <p className="text-gray-300">1,000 characters</p>
          </div>
          <div className="bg-sky-600 p-3 px-5 rounded-full">
            <p className="text-slate-200 font-semibold">Buy for $1.99</p>
          </div>
        </motion.div>
        <motion.div
          onClick={() => getCredit(2000)}
          whileTap={{ scale: 1.05 }}
          className="bg-slate-900 p-4 rounded-lg justify-between shadow-lg flex items-center"
        >
          <div>
            <p className="font-bold text-white text-2xl">+2,000 Credits</p>
            <p className="text-gray-300">2,000 characters</p>
          </div>
          <div className="bg-sky-600 p-3 px-5 rounded-full">
            <p className="text-slate-200 font-semibold">Buy for $3.99</p>
          </div>
        </motion.div>
        <motion.div
          onClick={() => getCredit(5000)}
          whileTap={{ scale: 1.05 }}
          className="bg-slate-900 p-4 rounded-lg justify-between shadow-lg flex items-center"
        >
          <div>
            <p className="font-bold text-white text-2xl">+5,000 Credits</p>
            <p className="text-gray-300">5,000 characters</p>
          </div>
          <div className="bg-sky-600 p-3 px-5 rounded-full">
            <p className="text-slate-200 font-semibold">Buy for $8.99</p>
          </div>
        </motion.div>
        <motion.div
          onClick={() => getCredit(10000)}
          whileTap={{ scale: 1.05 }}
          className="bg-slate-900 p-4 rounded-lg justify-between shadow-lg flex items-center"
        >
          <div>
            <p className="font-bold text-white text-2xl">+10,000 Credits</p>
            <p className="text-gray-300">10,000 characters</p>
          </div>
          <div className="bg-sky-600 p-3 px-5 rounded-full">
            <p className="text-slate-200 font-semibold">Buy for $14.99</p>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default BuyCredit;
