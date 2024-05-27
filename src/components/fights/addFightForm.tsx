import { useState } from "react";
import Swal from "sweetalert2";
import DetailItem from "../detailItems/detailItems";
import { FaCalendarAlt, FaTrophy } from "react-icons/fa";
import { RiBoxingFill } from "react-icons/ri";
import { GiAchillesHeel, GiBoxingGlove } from "react-icons/gi";
import { MdOutlineFmdBad } from "react-icons/md";


const AddFightForm: React.FC<AddFightFormProps> = ({}) => {
   const[formData, setFormData] = useState<Partial<FightData>>({
    peleadores: [""],
    ganador: "",
    perdedor:"",
    date:"",
    motivoVictoria:"",
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
        const token = "Aqui token auth";

        const response = await fetch("http://localhost:80/Peleas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const newFight = await response.json();
            Swal.fire("Exito", "La pelea ha sido agregada", "success");
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
        <h1 className="text-3xl font-bold text-white mb-4">Agregar Pelea</h1>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg">
            <div className="grid grid-cols-1 gap-6">
                <DetailItem
                    icon={<FaTrophy />}
                    label="Ganador"
                    value={
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Ganador"
                            value={formData.ganador}
                            onChange={handleChange}
                            required
                            className="bg-gray-700 p-2 rounded text-white w-full"
                        />
                    }
                />
                <DetailItem
                    icon={<GiAchillesHeel />}
                    label="Perdedor"
                    value={
                        <input
                            type="text"
                            name="perdedor"
                            placeholder="Perdedor"
                            value={formData.perdedor}
                            onChange={handleChange}
                            required
                            className="bg-gray-700 p-2 rounded text-white w-full"
                        />
                    }
                />
                <DetailItem
                    icon={<MdOutlineFmdBad />}
                    label="Motivo"
                    value={
                        <input
                            type="text"
                            name="Motivo"
                            placeholder="Motivo Victoria"
                            value={formData.motivoVictoria}
                            onChange={handleChange}
                            required
                            className="bg-gray-700 p-2 rounded text-white w-full"
                        />
                    }
                />
                <DetailItem
                    icon={<FaCalendarAlt />}
                    label="Fecha"
                    value={
                        <input
                            type="number"
                            name="Fecha"
                            placeholder="Fecha"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="bg-gray-700 p-2 rounded text-white w-full"
                        />
                    }
                />
                <DetailItem
                    icon={<GiBoxingGlove />}
                    label="Peleadores"
                    value={
                        <input
                            type="text"
                            name="peleadores"
                            placeholder="Peleadores"
                            value={formData.peleadores}
                            onChange={handleChange}
                            required
                            className="bg-gray-700 p-2 rounded text-white w-full"
                        />
                    }
                />
            </div>
        </form>
    </div>
   );
};

export default AddFightForm;