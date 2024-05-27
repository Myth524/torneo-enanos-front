import React, { useState, useEffect } from "react";
import FightsCard from "./fightsCard";
import { BiLoaderAlt } from "react-icons/bi";
import AddFightForm from "./addFightForm";


const Fights = () => {
    const [fightsData, setFightsData] = useState<FightData[]>([]);
    const [selectedFight, setSelectedFight] = useState<FightData | null>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [showAddForm, setShowAddForm] = useState<boolean>(false);

    const fetchFightsData = async () => {
        try {
            const response = await fetch("http://localhost:80/Peleas");
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
        setSelectedFight(null);
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
        <div className="flex-grow bg-teal-950 ml-64 mt-16">
            <div className="mx-8 my-8">
                <h1 className="text-3xl font-bold text-white mb-4">Peleas de nuestras aberraciones</h1>
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
                    <div className="mt-8">
                        <button onClick={handleShowAddForm} className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-700">
                            Agregar Pelea
                        </button>
                        <div className="grid grid-cols-2 gap-4">
                            {fights}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Fights;


//Mejorar el agregar pelea ya que los peleadores son los ids de los enanos y las fechas