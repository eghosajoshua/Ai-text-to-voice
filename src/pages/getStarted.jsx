import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import supabase from "../scripts/supabase";
import { toast, ToastContainer } from "react-toastify";
import { getWebString, setWebString } from "../utils/bridge";
import { useNavigate } from "react-router-dom";

function GetStarted({ setLoggedIn }) {
  let [previousWebString, setPreviousWebString] = useState("");
  let [accountCreated, setAccountCreated] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    let stringChecker = setInterval(() => {
      if (getWebString() != null) {
        if (previousWebString != getWebString()) {
          setPreviousWebString("");
          let email = getWebString();
          if (email.indexOf("@") >= 0) loginUser(email);
        }
      }
    }, 500);

    return () => clearInterval(stringChecker);
  }, []);

  let getStarted = () => {
    //TODO: trigger email selection on native app
    if ("AppInventor" in window) {
      setWebString("login");
    } else {
      loginUser("test@gmail.com");
    }
  };

  let loginUser = async (email) => {
    //check wether its already a user

    try {
      let { data, error } = await supabase
        .from("users")
        .select()
        .eq("email", email);

      if (error == null && data.length == 0 && !accountCreated) {
        //create new user
        let { error } = await supabase.from("users").insert({ email: email });
        if (error == null) {
          setAccountCreated(true);
          localStorage.setItem("user", email);
          setLoggedIn(true);
          navigate("/");
        } else {
          toast.error("something went wrong");
        }
      } else if (error == null && data[0].email == email) {
        //login user
        localStorage.setItem("user", email);
        setLoggedIn(true);
        navigate("/");
      } else {
        toast.warn("something went wrong");
      }
    } catch (e) {
      toast.warn("something went wrong");
    }
  };

  return (
    <div className="bg-cover  bg-no-repeat bg-center h-full bg-[url(/imgs/aivoice2.png)]">
      <div className="absolute bg-black top-0 opacity-10 left-0 h-[100vh] w-[100vw]"></div>

      <div className="absolute items-end p-8 flex bg-gradient-to-b from-transparent to-black top-0 left-0 h-[100vh] w-[100vw]">
        <motion.div
          onClick={() => getStarted()}
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
