import React, { useState, useEffect } from "react";
import { FaBirthdayCake, FaFlag, FaCalendarAlt, FaMedal, FaCrown, FaSkullCrossbones, FaFileAlt, FaDumbbell, FaBookOpen, FaPortrait, FaFistRaised, FaVenusMars, FaRulerVertical, FaWeight, FaSortNumericUp, FaHeartbeat, FaHandRock, FaHourglass, FaHandPaper, FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";
import { IoMdArrowBack } from "react-icons/io";
import DetailItem from "@/components/detailItems/detailItems";

const Biography: React.FC<BiographyProps> = ({ enanoData, onBack }) => {
  const [habilidadEspecial, setHabilidadEspecial] = useState<any>(null);
  const [historia, setHistoria] = useState<any>(null);
  const [biografia, setBiografia] = useState<any>(null);
  const [peleas, setPeleas] = useState<any[]>([]);
  const [artesMarciales, setArtesMarciales] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const initialValues = {
    genero: enanoData.genero || "",
    estatura: enanoData.estatura || 0,
    peso: enanoData.peso || 0,
    rango: enanoData.rango || 0,
    stamina: enanoData.stamina || 0,
    golpeo: enanoData.golpeo || 0,
    experiencia: enanoData.experiencia || 0,
    golpesCabeza: enanoData.golpesCabeza || 0,
    golpesTorso: enanoData.golpesTorso || 0,
    golpesPiernas: enanoData.golpesPiernas || 0,
    golpesRecibidos: enanoData.golpesRecibidos || 0,
  };

  const [genero, setGenero] = useState<string>(initialValues.genero);
  const [estatura, setEstatura] = useState<number>(initialValues.estatura);
  const [peso, setPeso] = useState<number>(initialValues.peso);
  const [rango, setRango] = useState<number>(initialValues.rango);
  const [stamina, setStamina] = useState<number>(initialValues.stamina);
  const [golpeo, setGolpeo] = useState<number>(initialValues.golpeo);
  const [experiencia, setExperiencia] = useState<number>(initialValues.experiencia);
  const [golpesCabeza, setGolpesCabeza] = useState<number>(initialValues.golpesCabeza);
  const [golpesTorso, setGolpesTorso] = useState<number>(initialValues.golpesTorso);
  const [golpesPiernas, setGolpesPiernas] = useState<number>(initialValues.golpesPiernas);
  const [golpesRecibidos, setGolpesRecibidos] = useState<number>(initialValues.golpesRecibidos);

  const handleEdit = async () => {
    if (isEditing) {
      const initialValues = {
        genero: enanoData.genero || "",
        estatura: enanoData.estatura || 0,
        peso: enanoData.peso || 0,
        rango: enanoData.rango || 0,
        stamina: enanoData.stamina || 0,
        golpeo: enanoData.golpeo || 0,
        experiencia: enanoData.experiencia || 0,
        golpesCabeza: enanoData.golpesCabeza || 0,
        golpesTorso: enanoData.golpesTorso || 0,
        golpesPiernas: enanoData.golpesPiernas || 0,
        golpesRecibidos: enanoData.golpesRecibidos || 0,
      };

      const hasChanged = (
        genero !== initialValues.genero ||
        estatura !== initialValues.estatura ||
        peso !== initialValues.peso ||
        rango !== initialValues.rango ||
        stamina !== initialValues.stamina ||
        golpeo !== initialValues.golpeo ||
        experiencia !== initialValues.experiencia ||
        golpesCabeza !== initialValues.golpesCabeza ||
        golpesTorso !== initialValues.golpesTorso ||
        golpesPiernas !== initialValues.golpesPiernas ||
        golpesRecibidos !== initialValues.golpesRecibidos
      );

      if (hasChanged) {
        try {
          const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTcxNjY3MTM2OCwiZXhwIjoxNzE2Njc0OTY4fQ._Wnkst8HwBoD8e1BXxDeloBym5m8P59WFsexNjulmWA";

          const response = await fetch(`http://localhost:3000/enanos/${enanoData._id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              genero,
              estatura,
              peso,
              rango,
              stamina,
              golpeo,
              experiencia,
              golpesCabeza,
              golpesTorso,
              golpesPiernas,
              golpesRecibidos
            })
          });

          if (response.ok) {
            console.log('Datos actualizados correctamente');
            enanoData.genero = genero;
            enanoData.estatura = estatura;
            enanoData.peso = peso;
            enanoData.rango = rango;
            enanoData.stamina = stamina;
            enanoData.golpeo = golpeo;
            enanoData.experiencia = experiencia;
            enanoData.golpesCabeza = golpesCabeza;
            enanoData.golpesTorso = golpesTorso;
            enanoData.golpesPiernas = golpesPiernas;
            enanoData.golpesRecibidos = golpesRecibidos;
          } else {
            console.error('Error al actualizar los datos en el servidor:', response.status);
          }
        } catch (error) {
          console.error('Error al realizar la solicitud PATCH:', error);
        }
      } else {
        console.log('No se han realizado cambios, no se enviará la solicitud PATCH');
      }
    }
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const habilidadEspecialResponse = await fetch(
          `http://localhost:3000/habilidadesEspeciales/${enanoData.habilidadEspecial_id}`
        );
        const habilidadEspecialData = await habilidadEspecialResponse.json();
        setHabilidadEspecial(habilidadEspecialData);

        const historiaResponse = await fetch(
          `http://localhost:3000/historias/${enanoData.historia_id}`
        );
        const historiaData = await historiaResponse.json();
        setHistoria(historiaData);

        const biografiaResponse = await fetch(
          `http://localhost:3000/biografias/${enanoData.biografia_id}`
        );
        const biografiaData = await biografiaResponse.json();
        setBiografia(biografiaData);

        if (enanoData.peleas && enanoData.peleas.length > 0) {
          const peleasData = await Promise.all(enanoData.peleas.map(async (pelea_id) => {
            const peleaResponse = await fetch(`http://localhost:3000/peleas/${pelea_id}`);
            return peleaResponse.json();
          }));
          setPeleas(peleasData);
        }

        if (enanoData.artesMarciales && enanoData.artesMarciales.length > 0) {
          const artesMarcialesData = await Promise.all(enanoData.artesMarciales.map(async (arte_id) => {
            const arteResponse = await fetch(`http://localhost:3000/artesMarciales/${arte_id}`);
            return arteResponse.json();
          }));
          setArtesMarciales(artesMarcialesData);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, [enanoData]);

  return (
    <div className="w-full max-w-8xl mx-auto p-6 bg-gray-900 text-white shadow-md rounded-lg relative">
      <button
        onClick={onBack}
        className="absolute top-6 left-6 text-white bg-teal-500 hover:bg-teal-600 p-2 rounded-full shadow-lg"
      >
        <IoMdArrowBack size={24} />
      </button>
      <button
        className="absolute top-6 right-8 text-white bg-teal-500 hover:bg-teal-600 p-2 rounded-full shadow-lg"
        onClick={handleEdit}
      >
        {isEditing ? "Guardar" : "Editar"}
      </button>
      <h2 className="text-3xl font-bold mb-6 text-center">{enanoData?.nombre}</h2>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <BiLoaderAlt className="animate-spin text-4xl text-teal-400" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">
          Error al cargar los datos. Por favor, inténtalo de nuevo más tarde.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <DetailItem icon={<FaBirthdayCake />} label="Fecha de nacimiento" value={biografia?.fechaNacimiento || ""} />

          <div className="grid grid-cols-4 gap-6">
            <DetailItem
              icon={<FaVenusMars />}
              label="Género"
              value={isEditing ? (
                <input
                  type="text"
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                  className="bg-gray-700 text-white rounded px-2 py-1"
                />
              ) : genero}
            />
            <DetailItem
              icon={<FaRulerVertical />}
              label="Estatura"
              value={isEditing ? (
                <input
                  type="number"
                  value={estatura}
                  onChange={(e) => setEstatura(Number(e.target.value))}
                  className="bg-gray-700 text-white rounded px-2 py-1"
                />
              ) : `${estatura} cm`}
            />
            <DetailItem
              icon={<FaWeight />}
              label="Peso"
              value={isEditing ? (
                <input
                  type="number"
                  value={peso}
                  onChange={(e) => setPeso(Number(e.target.value))}
                  className="bg-gray-700 text-white rounded px-2 py-1"
                />
              ) : `${peso} kg`}
            />
            <DetailItem
              icon={<FaMedal />}
              label="Rango"
              value={isEditing ? (
                <input
                  type="number"
                  value={rango}
                  onChange={(e) => setRango(Number(e.target.value))}
                  className="bg-gray-700 text-white rounded px-2 py-1"
                />
              ) : rango}
            />
            <DetailItem
              icon={<FaHeartbeat />}
              label="Stamina"
              value={isEditing ? (
                <input
                  type="number"
                  value={stamina}
                  onChange={(e) => setStamina(Number(e.target.value))}
                  className="bg-gray-700 text-white rounded px-2 py-1"
                />
              ) : stamina}
            />
            <DetailItem
              icon={<FaFistRaised />}
              label="Golpeo"
              value={isEditing ? (
                <input
                  type="number"
                  value={golpeo}
                  onChange={(e) => setGolpeo(Number(e.target.value))}
                  className="bg-gray-700 text-white rounded px-2 py-1"
                />
              ) : golpeo}
            />
            <DetailItem
              icon={<FaSortNumericUp />}
              label="Experiencia"
              value={isEditing ? (
                <input
                  type="number"
                  value={experiencia}
                  onChange={(e) => setExperiencia(Number(e.target.value))}
                  className="bg-gray-700 text-white rounded px-2 py-1"
                />
              ) : experiencia}
            />
            <DetailItem
              icon={<FaHandRock />}
              label="Golpes a la cabeza"
              value={isEditing ? (
                <input
                  type="number"
                  value={golpesCabeza}
                  onChange={(e) => setGolpesCabeza(Number(e.target.value))}
                  className="bg-gray-700 text-white rounded px-2 py-1"
                />
              ) : golpesCabeza}
            />
            <DetailItem
              icon={<FaHandPaper />}
              label="Golpes al torso"
              value={isEditing ? (
                <input
                  type="number"
                  value={golpesTorso}
                  onChange={(e) => setGolpesTorso(Number(e.target.value))}
                  className="bg-gray-700 text-white rounded px-2 py-1"
                />
              ) : golpesTorso}
            />
            <DetailItem
              icon={<FaHourglass />}
              label="Golpes a las piernas"
              value={isEditing ? (
                <input
                  type="number"
                  value={golpesPiernas}
                  onChange={(e) => setGolpesPiernas(Number(e.target.value))}
                  className="bg-gray-700 text-white rounded px-2 py-1"
                />
              ) : golpesPiernas}
            />
            <DetailItem
              icon={<FaArrowAltCircleUp />}
              label="Golpes recibidos"
              value={isEditing ? (
                <input
                  type="number"
                  value={golpesRecibidos}
                  onChange={(e) => setGolpesRecibidos(Number(e.target.value))}
                  className="bg-gray-700 text-white rounded px-2 py-1"
                />
              ) : golpesRecibidos}
            />

            <DetailItem 
              icon={<FaFlag />}
              label="País"
              value={biografia?.pais || ""} 
            />

          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="border border-teal-400 rounded-lg p-4 mb-4">
              <div className="text-teal-400 font-semibold text-lg mb-2">Habilidad Especial</div>
              <div className="grid grid-cols-1 gap-4">
                <DetailItem icon={<FaMedal />} label="Habilidad especial" value={habilidadEspecial?.nombre} />
                <DetailItem icon={<FaFileAlt />} label="Descripción" value={habilidadEspecial?.descripcion} />
                <DetailItem icon={<FaDumbbell />} label="Potencia" value={habilidadEspecial?.potencia} />
              </div>
            </div>
          </div>

          <DetailItem 
            icon={<FaBookOpen />} 
            label="Historia" 
            value={historia?.texto} 
          />

          <DetailItem 
            icon={<FaPortrait />} 
            label="Biografía" 
            value={biografia?.bio} 
          />

          {peleas.length > 0 && (
            <>
              <div className="text-teal-400 font-semibold text-lg">Peleas</div>
              {peleas.map((pelea, index) => (
                <div key={index} className="border border-teal-400 rounded-lg p-4 mb-4">
                  <div className="text-teal-400 font-semibold text-lg mb-2">
                    {pelea.ganador} vs {pelea.perdedor}
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <DetailItem icon={<FaCalendarAlt />} label="Fecha" value={pelea.date} />
                    <DetailItem icon={<FaMedal />} label="Ganador" value={pelea.ganador} />
                    <DetailItem icon={<FaSkullCrossbones />} label="Perdedor" value={pelea.perdedor} />
                    <DetailItem icon={<FaCrown />} label="Motivo de la Victoria" value={pelea.motivoVictoria} />
                  </div>
                </div>
              ))}
            </>
          )}

          {artesMarciales.length > 0 && (
            <>
              <div className="text-teal-400 font-semibold text-lg">Artes Marciales</div>
              {artesMarciales.map((arte, index) => (
                <div key={index} className="grid grid-cols-1 gap-4">
                  <DetailItem icon={<FaFistRaised />} label="Nombre" value={arte.name} />
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Biography;
