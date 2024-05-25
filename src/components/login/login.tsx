import { useState } from "react";

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Aquí agregar la lógica de manejo de login o registro
    // Por ahora, asumimos que el login siempre es exitoso
    console.log(isRegistering ? "Registrando" : "Iniciando sesión", { email, password });
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-6">
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-amber-600">
          {isRegistering ? "Regístrate" : "Iniciar Sesión"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isRegistering ? "Regístrate" : "Iniciar Sesión"}
            </button>
            <a
              href="#"
              onClick={() => setIsRegistering(!isRegistering)}
              className="inline-block align-baseline font-bold text-sm text-amber-600 hover:text-amber-800"
            >
              {isRegistering ? "Inicia sesión" : "Regístrate"}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;