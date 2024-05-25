import React from "react";
import { FaGenderless, FaBirthdayCake, FaRulerVertical, FaWeightHanging, FaMedal, FaRunning, FaFistRaised, FaBrain, FaHeadSideVirus, FaUserInjured, FaRegHeart, FaEye, FaTrash } from "react-icons/fa";

const EnanosCard: React.FC<EnanosCardProps> = (props) => {
  return (
    <div className="rounded-lg border-2 border-gray-200 shadow-lg p-4 flex items-start justify-between bg-white">
      <div>
        <h2 className="text-lg font-bold mb-2 text-gray-900">{props.nombre}</h2>
        <div className="flex items-center text-gray-700 mb-2">
          <FaGenderless className="mr-2" /> <p>Género: {props.genero}</p>
        </div>
        <div className="flex items-center text-gray-700 mb-2">
          <FaBirthdayCake className="mr-2" /> <p>Edad: {props.edad}</p>
        </div>
        <div className="flex items-center text-gray-700 mb-2">
          <FaRulerVertical className="mr-2" /> <p>Estatura: {props.estatura}</p>
        </div>
        <div className="flex items-center text-gray-700 mb-2">
          <FaWeightHanging className="mr-2" /> <p>Peso: {props.peso}</p>
        </div>
        <div className="flex items-center text-gray-700 mb-2">
          <FaMedal className="mr-2" /> <p>Rango: {props.rango}</p>
        </div>
        <div className="flex items-center text-gray-700 mb-2">
          <FaRunning className="mr-2" /> <p>Stamina: {props.stamina}</p>
        </div>
      </div>
      <div>
        <div className="flex items-center text-gray-700 mb-2">
          <FaFistRaised className="mr-2" /> <p>Golpeo: {props.golpeo}</p>
        </div>
        <div className="flex items-center text-gray-700 mb-2">
          <FaBrain className="mr-2" /> <p>Experiencia: {props.experiencia}</p>
        </div>
        <div className="flex items-center text-gray-700 mb-2">
          <FaHeadSideVirus className="mr-2" /> <p>Golpes Cabeza: {props.golpesCabeza}</p>
        </div>
        <div className="flex items-center text-gray-700 mb-2">
          <FaUserInjured className="mr-2" /> <p>Golpes Torso: {props.golpesTorso}</p>
        </div>
        <div className="flex items-center text-gray-700 mb-2">
          <FaUserInjured className="mr-2" /> <p>Golpes Piernas: {props.golpesPiernas}</p>
        </div>
        <div className="flex items-center text-gray-700">
          <FaRegHeart className="mr-2" /> <p>Golpes Recibidos: {props.golpesRecibidos}</p>
        </div>
      </div>
      <div>
        <button className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-800 mr-2" onClick={props.onVisualizar}>
          <FaEye className="mr-2" /> Visualizar
        </button>
        <button className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-800" onClick={props.onEliminar}>
          <FaTrash className="mr-2" /> Eliminar
        </button>
      </div>
    </div>
  );
};

export default EnanosCard;
