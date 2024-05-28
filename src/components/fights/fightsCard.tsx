import React from "react";
import { FaCalendarAlt, FaSkullCrossbones, FaTrophy } from "react-icons/fa";
import { MdOutlineFmdBad } from "react-icons/md";

const FightsCard: React.FC<FightsCardProps> = (props) => {
    return (
        <div className="rounded-lg border-2 border-gray-200 shadow-lg mt-3 mb-3 mr-3 ml-3 p-3 bg-white">
            <h2 className="text-lg font-bold mb-2 text-teal-500">{props.ganador} Vs {props.perdedor}</h2>
            <div className="flex items-center text-gray-700 mb-2">
                <FaTrophy className="mr-2" /> <p>Ganador: {props.ganador}</p>
            </div>
            <div className="flex items-center text-gray-700 mb-2">
                <FaSkullCrossbones className="mr-2" /> <p>Perdedor: {props.perdedor}</p>
            </div>
            <div className="flex items-center text-gray-700 mb-2">
                <MdOutlineFmdBad className="mr-2" /> <p>Motivo de Victoria: {props.motivoVictoria}</p>
            </div>
            <div className="flex items-center text-gray-700 mb-2">
                <FaCalendarAlt className="mr-2" /> <p>Fecha: {props.date}</p>
            </div>
        </div>
    );
};

export default FightsCard;