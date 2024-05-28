import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import EnanosCard from "./enanosCard";
import Biography from "../biography/biography";
import { BiLoaderAlt } from "react-icons/bi";
import AddEnanoForm from "./addEnanoForm";

const Enanos = () => {
  const [enanosData, setEnanosData] = useState<EnanoData[]>([]);
  const [selectedEnano, setSelectedEnano] = useState<EnanoData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [showAddForm, setShowAddForm] = useState<boolean>(false); 

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

  const handleVisualizar = (enano: EnanoData) => {
    setSelectedEnano(enano);
    setShowAddForm(false);
  };

  const handleBack = () => {
    fetchEnanosData();
    setSelectedEnano(null);
    setShowAddForm(false);
  };

  const handleEliminar = async (id: string) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enanos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        fetchEnanosData();
        Swal.fire(
          'Eliminado',
          'El enano ha sido eliminado.',
          'success'
        );
      } else {
        console.error('Error al eliminar el enano');
        Swal.fire(
          'Error',
          'Hubo un problema al eliminar el enano.',
          'error'
        );
      }
    } catch (error) {
      console.error('Error al eliminar el enano:', error);
      Swal.fire(
        'Error',
        'Hubo un problema al eliminar el enano.',
        'error'
      );
    }
  };

  const handleShowAddForm = () => {
    setShowAddForm(true);
    setSelectedEnano(null);
  };

  const enanos = enanosData.map((enano) => (
    <div key={enano._id}>
      <EnanosCard
        _id={enano._id}
        nombre={enano.nombre}
        genero={enano.genero}
        edad={enano.edad}
        estatura={enano.estatura}
        peso={enano.peso}
        rango={enano.rango}
        stamina={enano.stamina}
        golpeo={enano.golpeo}
        experiencia={enano.experiencia}
        golpesCabeza={enano.golpesCabeza}
        golpesTorso={enano.golpesTorso}
        golpesPiernas={enano.golpesPiernas}
        golpesRecibidos={enano.golpesRecibidos}
        artesMarciales={enano.artesMarciales}
        peleas={enano.peleas}
        historia_id={enano.historia_id}
        habilidadEspecial_id={enano.habilidadEspecial_id}
        biografia_id={enano.biografia_id}
        onVisualizar={() => handleVisualizar(enano)}
        onEliminar={() => handleEliminar(enano._id)}
      />
    </div>
  ));

  return (
    <div className="flex-grow ml-64 mt-16 w-full max-w-8xl mx-auto p-6 bg-teal-950 text-white shadow-md relative">
      <h1 className="text-3xl font-bold text-white mb-4">Las aberraciones del planeta</h1>
      {!showAddForm && !selectedEnano && (
        <button onClick={handleShowAddForm} className="absolute top-6 right-8 text-white bg-teal-500 hover:bg-teal-600 p-2 rounded-full shadow-lg">
          Agregar Enano
        </button>
      )}
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <BiLoaderAlt className="animate-spin text-4xl text-teal-400" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">
          Error al cargar los datos. Por favor, inténtalo de nuevo más tarde.
        </div>
      ) : showAddForm ? ( 
        <AddEnanoForm onBack={handleBack} />
      ) : selectedEnano ? (
        <Biography enanoData={selectedEnano} onBack={handleBack} />
      ) : (
          <div className="w-full max-w-8xl mx-auto top-4 p-6 bg-gray-900 text-white shadow-md rounded-lg relative grid grid-cols-2">
            {enanos}
        </div>
      )}
    </div>
  );
};

export default Enanos;
