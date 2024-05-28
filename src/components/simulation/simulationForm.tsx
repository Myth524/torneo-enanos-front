import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import DetailItem from '../detailItems/detailItems';
import { FaSkullCrossbones, FaTrophy } from 'react-icons/fa';
import { GiBoxingGlove } from 'react-icons/gi';

const SimulationForm = () => {
  const [enanosData, setEnanosData] = useState<EnanoData[]>([]);
  const [selectedFighters, setSelectedFighters] = useState<EnanoData[]>([]);
  const [formData, setFormData] = useState<Partial<FightData>>({
    peleadores: [],
    ganador: "",
    perdedor: "",
    date: "",
    motivoVictoria: "",
  });
  const [simulationData, setSimulationData] = useState<Partial<SimulationProps>>({
    ganador: "",
    perdedor: "",
  });

  const fetchEnanosData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enanos`);
      const jsonData = await response.json();
      setEnanosData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchEnanosData();
  }, []);

  const handleFighterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedEnano = enanosData.find((enano) => enano._id === selectedId);

    if (selectedEnano && !selectedFighters.some((fighter) => fighter._id === selectedId)) {
      if (selectedFighters.length < 2) {
        const newSelectedFighters = [...selectedFighters, selectedEnano];
        setSelectedFighters(newSelectedFighters);
        setFormData({
          ...formData,
          peleadores: newSelectedFighters.map((fighter) => fighter._id),
        });
      } else {
        Swal.fire("Error", "Solo puedes seleccionar hasta dos peleadores", "error");
      }
    } else {
      Swal.fire("Error", "No puedes seleccionar el mismo peleador dos veces", "error");
    }
  };

  const handleRemoveFighter = (fighterId: string) => {
    const newSelectedFighters = selectedFighters.filter((fighter) => fighter._id !== fighterId);
    setSelectedFighters(newSelectedFighters);
    setFormData({
      ...formData,
      peleadores: newSelectedFighters.map((fighter) => fighter._id),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/simulaciones`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newSimulation = await response.json();
        setSimulationData(newSimulation);
        setFormData({
          ...formData,
          ganador: enanosData.find((enano) => enano._id===newSimulation.ganador)?.nombre,
          perdedor: enanosData.find((enano) => enano._id===newSimulation.perdedor)?.nombre,
        });
        console.log(newSimulation);
        
      } else {
        Swal.fire("Error", "Hubo un problema al hacer la simulacion", "error");
      }
    } catch (error) {
      console.error("Error making simulation: ", error);
      Swal.fire("Error", "Hubo un problema al hacer la simulacion", "error");
    }
  };

  const handleReset = () => {
    setSelectedFighters([]);
    setFormData({
      peleadores: [],
      ganador: "",
      perdedor: "",
      date: "",
      motivoVictoria: "",
    });
    setSimulationData({
      ganador: "",
      perdedor: "",
    });
  };

  return (
    <div className="flex flex-col items-center bg-teal-950 min-h-screen p-8">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto p-6 bg-gray-900 text-white shadow-md rounded-lg relative">
        <h2 className="text-3xl font-bold mb-6 text-center">Simular Pelea</h2>
        <div className="grid grid-cols-1 gap-6">
          <DetailItem
            icon={<GiBoxingGlove />}
            label="Peleadores"
            value={
              <div className="flex items-center">
                <select
                  onChange={handleFighterChange}
                  className={`bg-gray-700 p-2 rounded text-white w-full mb-2`}
                  required
                  value=""
                  disabled={selectedFighters.length >= 2}
                >
                  <option value="" disabled>
                    Selecciona un peleador
                  </option>
                  {enanosData.map((enano) => (
                    <option key={enano._id} value={enano._id}>
                      {enano.nombre}
                    </option>
                  ))}
                </select>
                <div className="flex ml-4 gap-2">
                  {selectedFighters.map((fighter) => (
                    <div key={fighter._id} className="bg-gray-700 p-2 rounded text-white flex items-center">
                      {fighter.nombre}
                      <button
                        type="button"
                        className="ml-2 text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveFighter(fighter._id)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            }
          />
        <DetailItem
            icon={<FaTrophy />}
            label="Ganador"
            value={
                <input 
                className="bg-gray-700 p-2 rounded text-white"
                placeholder="Ganador"
                value={formData.ganador}
                readOnly 
                />
            }
            />
          <DetailItem
            icon={<FaSkullCrossbones />}
            label="Perdedor"
            value={
                <input 
                className="bg-gray-700 p-2 rounded text-white"
                placeholder="Perdedor"
                value={formData.perdedor}
                readOnly 
                />
            }
          />
        </div>
        <div className="flex justify-between mt-4">
          <button type="submit" className="bg-cyan-500 text-white py-2 px-4 rounded-full hover:bg-cyan-700">
            Simular
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-amber-500 text-white py-2 px-4 rounded-full hover:bg-amber-700"
          >
            Resetear
          </button>
        </div>
      </form>
    </div>
  );
};

export default SimulationForm;
