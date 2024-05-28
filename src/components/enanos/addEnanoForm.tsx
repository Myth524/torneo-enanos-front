import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  FaVenusMars, FaRulerVertical, FaWeight, FaMedal, FaHeartbeat, FaFistRaised,
  FaSortNumericUp, FaHandRock, FaHandPaper, FaHourglass, FaArrowAltCircleUp
} from "react-icons/fa";
import DetailItem from "@/components/detailItems/detailItems";
import { IoMdArrowBack } from "react-icons/io";

const AddEnanoForm: React.FC<AddEnanoFormProps> = ({ onBack }) => {
  const [formData, setFormData] = useState<Partial<EnanoData>>({
    nombre: "",
    genero: "",
    edad: 0,
    estatura: 0,
    peso: 0,
    rango: 0,
    stamina: 0,
    golpeo: 0,
    experiencia: 0,
    golpesCabeza: 0,
    golpesTorso: 0,
    golpesPiernas: 0,
    golpesRecibidos: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enanos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newEnano = await response.json();
        Swal.fire("Éxito", "El enano ha sido agregado", "success");
        onBack();
      } else {
        Swal.fire("Error", "Hubo un problema al agregar el enano", "error");
      }
    } catch (error) {
      console.error("Error adding enano:", error);
      Swal.fire("Error", "Hubo un problema al agregar el enano", "error");
    }
  };

  return (
    <div className="flex flex-col items-center bg-teal-950 min-h-screen p-8">
      <form onSubmit={handleSubmit} className="w-full max-w-8xl mx-auto p-6 bg-gray-900 text-white shadow-md rounded-lg relative">
        <h2 className="text-3xl font-bold mb-6 text-center">Agregar Enano</h2>
        <button
          type="button"
          onClick={onBack}
          className="absolute top-6 left-6 text-white bg-teal-500 hover:bg-teal-600 p-2 rounded-full shadow-lg"
        >
          <IoMdArrowBack size={24} />
        </button>
        <div className="grid grid-cols-2 gap-6">
          <DetailItem
            icon={<FaVenusMars />}
            label="Nombre"
            value={
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="bg-gray-700 p-2 rounded text-white w-full"
              />
            }
          />
          <DetailItem
            icon={<FaVenusMars />}
            label="Género"
            value={
              <input
                type="text"
                name="genero"
                placeholder="Género"
                value={formData.genero}
                onChange={handleChange}
                required
                className="bg-gray-700 p-2 rounded text-white w-full"
              />
            }
          />
          <DetailItem
            icon={<FaSortNumericUp />}
            label="Edad"
            value={
              <input
                type="number"
                name="edad"
                placeholder="Edad"
                value={formData.edad}
                onChange={handleChange}
                required
                className="bg-gray-700 p-2 rounded text-white w-full"
              />
            }
          />
          <DetailItem
            icon={<FaRulerVertical />}
            label="Estatura"
            value={
              <input
                type="number"
                name="estatura"
                placeholder="Estatura"
                value={formData.estatura}
                onChange={handleChange}
                required
                className="bg-gray-700 p-2 rounded text-white w-full"
              />
            }
          />
          <DetailItem
            icon={<FaWeight />}
            label="Peso"
            value={
              <input
                type="number"
                name="peso"
                placeholder="Peso"
                value={formData.peso}
                onChange={handleChange}
                required
                className="bg-gray-700 p-2 rounded text-white w-full"
              />
            }
          />
          <DetailItem
            icon={<FaMedal />}
            label="Rango"
            value={
              <input
                type="number"
                name="rango"
                placeholder="Rango"
                value={formData.rango}
                onChange={handleChange}
                required
                className="bg-gray-700 p-2 rounded text-white w-full"
              />
            }
          />
          <DetailItem
            icon={<FaHeartbeat />}
            label="Stamina"
            value={
              <input
                type="number"
                name="stamina"
                placeholder="Stamina"
                value={formData.stamina}
                onChange={handleChange}
                required
                className="bg-gray-700 p-2 rounded text-white w-full"
              />
            }
          />
          <DetailItem
            icon={<FaFistRaised />}
            label="Golpeo"
            value={
              <input
                type="number"
                name="golpeo"
                placeholder="Golpeo"
                value={formData.golpeo}
                onChange={handleChange}
                required
                className="bg-gray-700 p-2 rounded text-white w-full"
              />
            }
          />
          <DetailItem
            icon={<FaSortNumericUp />}
            label="Experiencia"
            value={
              <input
                type="number"
                name="experiencia"
                placeholder="Experiencia"
                value={formData.experiencia}
                onChange={handleChange}
                required
                className="bg-gray-700 p-2 rounded text-white w-full"
              />
            }
          />
          <DetailItem
            icon={<FaHandRock />}
            label="Golpes Cabeza"
            value={
              <input
                type="number"
                name="golpesCabeza"
                placeholder="Golpes Cabeza"
                value={formData.golpesCabeza}
                onChange={handleChange}
                required
                className="bg-gray-700 p-2 rounded text-white w-full"
              />
            }
          />
          <DetailItem
            icon={<FaHandPaper />}
            label="Golpes Torso"
            value={
              <input
                type="number"
                name="golpesTorso"
                placeholder="Golpes Torso"
                value={formData.golpesTorso}
                onChange={handleChange}
                required
                className="bg-gray-700 p-2 rounded text-white w-full"
              />
            }
          />
          <DetailItem
            icon={<FaHourglass />}
            label="Golpes Piernas"
            value={
              <input
                type="number"
                name="golpesPiernas"
                placeholder="Golpes Piernas"
                value={formData.golpesPiernas}
                onChange={handleChange}
                required
                className="bg-gray-700 p-2 rounded text-white w-full"
              />
            }
          />
          <DetailItem
            icon={<FaArrowAltCircleUp />}
            label="Golpes Recibidos"
            value={
              <input
                type="number"
                name="golpesRecibidos"
                placeholder="Golpes Recibidos"
                value={formData.golpesRecibidos}
                onChange={handleChange}
                required
                className="bg-gray-700 p-2 rounded text-white w-full"
              />
            }
          />
        </div>
        <div className="flex justify-between mt-4">
          <button type="submit" className="bg-cyan-500 text-white py-2 px-4 rounded-full hover:bg-cyan-700">
            Agregar Enano
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

export default AddEnanoForm;
