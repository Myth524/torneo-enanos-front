import React, { useState, useEffect } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import SimulationForm from "./simulationForm";

const Simulation = () => {
    const [enanosData, setEnanosData] = useState<EnanoData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const fetchEnanosData = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enanos`);
          const jsonData = await response.json();
          setEnanosData(jsonData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError(true);
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchEnanosData();
      }, []);
    return (
        <div className="flex-grow ml-64 mt-16 w-full max-w-8xl mx-auto p-6 bg-teal-950 text-white shadow-md relative">
            <h1 className="text-3xl font-bold text-white mb-4">Simular Orgias Grotescas de Enanos</h1>
                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <BiLoaderAlt className="animate-spin text-4xl text-teal-400" />
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500">
                        Error al cargar los datos. Por favor, intentelo de nuevo masa tarde.
                    </div>
                ) : (
                    <div>
                    <SimulationForm />
                    </div>
                )}
        </div>
    );
};

export default Simulation;