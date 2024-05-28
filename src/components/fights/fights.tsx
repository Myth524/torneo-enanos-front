import React, { useState, useEffect } from "react";
import FightsCard from "./fightsCard";
import { BiLoaderAlt } from "react-icons/bi";
import AddFightForm from "./addFightForm";

const Fights = () => {
    const [fightsData, setFightsData] = useState<FightData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [showAddForm, setShowAddForm] = useState<boolean>(false);

    const fetchFightsData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/peleas/`);
            const jsonData = await response.json();
            setFightsData(jsonData);
            setLoading(false);
        }catch (error) {
            console.error("Error fetching data:", error);
            setError(true);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFightsData();
    }, []);

    const handleShowAddForm = () => {
        setShowAddForm(true);
    };

    const handleBack = () => {
        fetchFightsData();
        setShowAddForm(false);
      };

    const fights = fightsData.map((fight) => (
        <div key={fight._id}>
            <FightsCard
                _id={fight._id}
                ganador={fight.ganador}
                perdedor={fight.perdedor}
                motivoVictoria={fight.motivoVictoria}
                date={fight.date}
                peleadores={fight.peleadores}
            />
        </div>
    ));

    return (
        <div className="flex-grow ml-64 mt-16 w-full max-w-8xl mx-auto p-6 bg-teal-950 text-white shadow-md relative">
            <h1 className="text-3xl font-bold text-white mb-4">Peleas de nuestras aberraciones</h1>
                 {!showAddForm && (
                <button onClick={handleShowAddForm} className="absolute top-6 right-8 text-white bg-teal-500 hover:bg-teal-600 p-2 rounded-full shadow-lg">
                    Agregar Pelea
                </button>
                )}
                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <BiLoaderAlt className="animate-spin text-4xl text-teal-400" />
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500">
                        Error al cargar los datos. Por favor, intentelo de nuevo masa tarde.
                    </div>
                ) : showAddForm ? (
                    <AddFightForm onAddFight={handleShowAddForm} onBack={handleBack} />
                ) : (
                    <div className="w-full max-w-8xl mx-auto top-4 p-6 bg-gray-900 text-white shadow-md rounded-lg relative grid grid-cols-2">
                        {fights}
                    </div>
                )}
        </div>
    );
};

export default Fights;