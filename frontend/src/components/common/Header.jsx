import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="w-full flex justify-center items-center h-16 list-none border-b-2 border-b-gray-300">
      <Link to="/" className="underline hover:no-underline text-blue-500">
        Survey
      </Link>
    </nav>
  );
}

export default Header;
