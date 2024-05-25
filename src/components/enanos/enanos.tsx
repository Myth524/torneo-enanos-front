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
      const response = await fetch("http://localhost:80/enanos");
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
  };

  const handleBack = () => {
    setSelectedEnano(null);
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
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTcxNjY1Njk5MywiZXhwIjoxNzE2NjYwNTkzfQ.i-woOoXZb6zfO4n7QSnBD-OEWT_LydZugxEVjcWGd34";

      const response = await fetch(`http://localhost:80/enanos/${id}`, {
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
        estadistica_id={enano.estadistica_id}
        historia_id={enano.historia_id}
        habilidadEspecial_id={enano.habilidadEspecial_id}
        biografia_id={enano.biografia_id}
        onVisualizar={() => handleVisualizar(enano)}
        onEliminar={() => handleEliminar(enano._id)}
      />
    </div>
  ));

  return (
    <div className="flex-grow bg-teal-950 ml-64 mt-16">
      <div className="mx-8 my-8">
        <h1 className="text-3xl font-bold text-white mb-4">Las aberraciones del planeta</h1>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <BiLoaderAlt className="animate-spin text-4xl text-teal-400" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            Error al cargar los datos. Por favor, inténtalo de nuevo más tarde.
          </div>
        ) : showAddForm ? ( 
        <AddEnanoForm onAddEnano={handleShowAddForm} onBack={handleBack}/>
        ): selectedEnano ? (
          <Biography enanoData={selectedEnano} onBack={handleBack} />
        ) : (
          <div className="mt-8">
            <button onClick={handleShowAddForm} className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-700">
              Agregar Enano
            </button>
            <div className="grid grid-cols-1 gap-4">
              {enanos}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enanos;
