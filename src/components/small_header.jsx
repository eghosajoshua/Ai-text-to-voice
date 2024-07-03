import { string } from "prop-types";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

function SmallHeader({ title, link }) {
  return (
    <header className="bg-white p-3 py-5 dark:bg-slate-900">
      <Link to={link} className="flex gap-2 items-center ">
        <FaArrowLeft className="dark:text-white"/>
        <p className="dark:text-white font-semibold text-lg">{title}</p>
      </Link>
    </header>
  );
}

export default SmallHeader;
