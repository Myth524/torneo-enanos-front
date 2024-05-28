import React from "react";
import { FaGenderless, FaBirthdayCake, FaRulerVertical, FaWeightHanging, FaMedal, FaRunning, FaFistRaised, FaBrain, FaHeadSideVirus, FaUserInjured, FaRegHeart, FaEye, FaTrash } from "react-icons/fa";

const EnanosCard: React.FC<EnanosCardProps> = (props) => {
  return (
    <div className="rounded-lg border-2 border-gray-200 shadow-lg mt-3 mb-3 mr-3 ml-3 p-3 bg-white">
      <h2 className="text-lg font-bold mb-4 text-teal-500">{props.nombre}</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-gray-700">
          <FaGenderless className="mr-2" /> <p>Género: {props.genero}</p>
        </div>
        <div className="flex items-center text-gray-700">
          <FaBirthdayCake className="mr-2" /> <p>Edad: {props.edad}</p>
        </div>
        <div className="flex items-center text-gray-700">
          <FaRulerVertical className="mr-2" /> <p>Estatura: {props.estatura}</p>
        </div>
        <div className="flex items-center text-gray-700">
          <FaWeightHanging className="mr-2" /> <p>Peso: {props.peso}</p>
        </div>
        <div className="flex items-center text-gray-700">
          <FaMedal className="mr-2" /> <p>Rango: {props.rango}</p>
        </div>
        <div className="flex items-center text-gray-700">
          <FaRunning className="mr-2" /> <p>Stamina: {props.stamina}</p>
        </div>
        <div className="flex items-center text-gray-700">
          <FaFistRaised className="mr-2" /> <p>Golpeo: {props.golpeo}</p>
        </div>
        <div className="flex items-center text-gray-700">
          <FaBrain className="mr-2" /> <p>Experiencia: {props.experiencia}</p>
        </div>
        <div className="flex items-center text-gray-700">
          <FaHeadSideVirus className="mr-2" /> <p>Golpes Cabeza: {props.golpesCabeza}</p>
        </div>
        <div className="flex items-center text-gray-700">
          <FaUserInjured className="mr-2" /> <p>Golpes Torso: {props.golpesTorso}</p>
        </div>
        <div className="flex items-center text-gray-700">
          <FaUserInjured className="mr-2" /> <p>Golpes Piernas: {props.golpesPiernas}</p>
        </div>
        <div className="flex items-center text-gray-700">
          <FaRegHeart className="mr-2" /> <p>Golpes Recibidos: {props.golpesRecibidos}</p>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-800 mr-2 flex items-center" onClick={props.onVisualizar}>
          <FaEye className="mr-2" /> Visualizar
        </button>
        <button className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-800 flex items-center" onClick={props.onEliminar}>
          <FaTrash className="mr-2" /> Eliminar
        </button>
      </div>
    </div>
  );
};

export default EnanosCard;
