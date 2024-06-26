import React from "react";
import { FaUserCircle, FaBell, FaCog } from "react-icons/fa";
import logo from "@/images/icono_página.webp"; 

const Topbar: React.FC = () => {
  return (
    <div className="bg-green-700 h-16 flex items-center px-4 fixed top-0 w-full z-50 shadow-lg">
        <img
        src={logo.src}
        alt={"Imagen Epicarda"}
        className="h-full w-auto rounded-full mr-2 p-1"
        />
      <h1 className="text-white text-2xl font-bold tracking-wide">Torneo Épico de Enanos</h1>
      <div className="flex items-center space-x-4 ml-auto">
        <FaBell className="text-white text-3xl cursor-pointer transition duration-200 ease-in-out transform hover:scale-110" />
        <FaUserCircle className="text-white text-3xl cursor-pointer transition duration-200 ease-in-out transform hover:scale-110" />
        <FaCog className="text-white text-3xl cursor-pointer transition duration-200 ease-in-out transform hover:scale-110" />
      </div>
    </div>
  );
};

export default Topbar;
