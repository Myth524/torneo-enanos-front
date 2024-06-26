import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import DetailItem from '../detailItems/detailItems';
import { FaCalendarAlt, FaSkullCrossbones, FaTrophy } from 'react-icons/fa';
import { GiBoxingGlove } from 'react-icons/gi';
import { MdOutlineFmdBad } from 'react-icons/md';
import { IoMdArrowBack } from 'react-icons/io';

const AddFightForm: React.FC<AddFightFormProps> = ({ onBack }) => {
  const [enanosData, setEnanosData] = useState<EnanoData[]>([]);
  const [selectedFighters, setSelectedFighters] = useState<EnanoData[]>([]);
  const [formData, setFormData] = useState<Partial<FightData>>({
    peleadores: [],
    ganador: "",
    perdedor: "",
    date: "",
    motivoVictoria: "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

  const handleWinnerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const winnerId = e.target.value;
    setFormData({
      ...formData,
      ganador: winnerId,
      perdedor: selectedFighters.find(fighter => fighter._id !== winnerId)?._id || "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const ganador =  selectedFighters.find(fighter => fighter._id !== formData.ganador)?.nombre;
      const perdedor =  selectedFighters.find(fighter => fighter._id !== formData.perdedor)?.nombre;

      const requestData = {
        ...formData,
        ganador: ganador,
        perdedor: perdedor,
      };
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/peleas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const newFight = await response.json();
        Swal.fire("Exito", "La pelea ha sido agregada", "success");
        onBack();
      } else {
        Swal.fire("Error", "Hubo un problema al agregar la pelea", "error");
      }
    } catch (error) {
      console.error("Error adding fight: ", error);
      Swal.fire("Error", "Hubo un problema al agregar la pelea", "error");
    }
  };

  return (
    <div className="flex flex-col items-center bg-teal-950 min-h-screen p-8">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto p-6 bg-gray-900 text-white shadow-md rounded-lg relative">
        <h2 className="text-3xl font-bold mb-6 text-center">Agregar Pelea</h2>
        <button
          type="button"
          onClick={onBack}
          className="absolute top-6 left-6 text-white bg-teal-500 hover:bg-teal-600 p-2 rounded-full shadow-lg"
        >
          <IoMdArrowBack size={24} />
        </button>
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
              <select
                name="ganador"
                className={`bg-gray-700 p-2 rounded text-white w-full mb-2`}
                value={formData.ganador}
                onChange={handleWinnerChange}
                required
                disabled={selectedFighters.length !== 2}
              >
                <option value="" disabled>
                  Selecciona el ganador
                </option>
                {selectedFighters.map((fighter) => (
                  <option key={fighter._id} value={fighter._id}>
                    {fighter.nombre}
                  </option>
                ))}
              </select>
            }
          />
          <DetailItem
            icon={<FaSkullCrossbones />}
            label="Perdedor"
            value={
              <select
                name="perdedor"
                className={`bg-gray-700 p-2 rounded text-white w-full mb-2`}
                value={formData.perdedor}
                required
                disabled
              >
                <option value="" disabled>
                  Selecciona el perdedor
                </option>
                {selectedFighters.map((fighter) => (
                  <option key={fighter._id} value={fighter._id}>
                    {fighter.nombre}
                  </option>
                ))}
              </select>
            }
          />
          <DetailItem
            icon={<MdOutlineFmdBad />}
            label="Motivo"
            value={
              <input
                type="text"
                name="motivoVictoria"
                placeholder="Motivo Victoria"
                value={formData.motivoVictoria}
                onChange={handleChange}
                required
                className={`bg-gray-700 p-2 rounded ${formData.motivoVictoria === "" ? 'text-gray-500' : 'text-white'} w-full`}
              />
            }
          />
          <DetailItem
            icon={<FaCalendarAlt />}
            label="Fecha"
            value={
              <input
                type="date"
                name="date"
                placeholder="Fecha"
                value={formData.date}
                onChange={handleChange}
                required
                className={`bg-gray-700 p-2 rounded ${formData.date === "" ? 'text-gray-500' : 'text-white'} w-full mb-2`}
              />
            }
          />
        </div>
        <div className="flex justify-between mt-4">
          <button type="submit" className="bg-cyan-500 text-white py-2 px-4 rounded-full hover:bg-cyan-700">
            Agregar Pelea
          </button>
          <button
            type="button"
            onClick={onBack}
            className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-700"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFightForm;
