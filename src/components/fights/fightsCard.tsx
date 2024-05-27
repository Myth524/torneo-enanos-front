import React from "react";
import { FaBirthdayCake, FaCalendarAlt, FaGenderless, FaTrophy } from "react-icons/fa";
import { GiAchillesHeel } from "react-icons/gi";
import { MdOutlineFmdBad } from "react-icons/md";

const FightsCard: React.FC<FightsCardProps> = (props) => {
    return (
        <div className="rounded-lg border-2 border-gray-200 shadow-lg p-4 flex items-start justify-between bg-white">
            <div>
                <h2 className="text-lg font-bold mb-2 text-gray-900">{props.ganador} Vs {props.perdedor}</h2>
                <div className="flex items-center text-gray-700 mb-2">
                    <FaTrophy className="mr-2" /> <p>Ganador: {props.ganador}</p>
                </div>
                <div className="flex items-center text-gray-700 mb-2">
                    <GiAchillesHeel className="mr-2" /> <p>Perdedor: {props.perdedor}</p>
                </div>
                <div className="flex items-center text-gray-700 mb-2">
                    <MdOutlineFmdBad className="mr-2" /> <p>Motivo de Victoria: {props.motivoVictoria}</p>
                </div>
                <div className="flex items-center text-gray-700 mb-2">
                    <FaCalendarAlt className="mr-2" /> <p>Fecha: {props.date}</p>
                </div>
            </div>
        </div>
    );
};

export default FightsCard;