import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Foro: React.FC = () => {
  const [messages, setMessages] = useState<ForoProps[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/foro`);
        const jsonData = await response.json();
        setMessages(jsonData);
      } catch (err) {
        setError('Error fetching messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') {
      Swal.fire('Error', 'No se puede enviar un mensaje vacío.', 'error');
      return;
    }

    const newMessage = {
      mensaje: inputValue,
      fechaCreacion: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/foro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
      });
      const jsonData = await response.json();

      if (response.ok) {
        setMessages((prevMessages) => [...prevMessages, jsonData]);
        setInputValue('');

        setTimeout(() => {
          const botMessage: ForoProps = {
            _id: Date.now().toString(),
            mensaje: `Estas hablando con el chat bot de Brayan Camilo Estrada y en efecto le encanta el"${jsonData.mensaje}"`,
            fechaCreacion: new Date().toISOString(),
            __v: 1,
          };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        }, 1000);
      } else {
        Swal.fire('Error', 'Hubo un problema publicando el mensaje.', 'error');
      }
    } catch (error) {
      console.error('Error publicando el mensaje: ', error);
      Swal.fire('Error', 'Hubo un problema publicando el mensaje.', 'error');
    }
  };

  return (
    <div className="flex-grow ml-64 mt-16 w-full max-w-8xl mx-auto p-6 bg-teal-950 text-white shadow-md relative">
      <div className="flex-1 overflow-y-auto p-4 bg-gray-800 rounded shadow-md">
        {loading && <p>Loading messages...</p>}
        {error && <p>{error}</p>}
        {messages.map((message) => (
          <div
            key={message._id}
            className={`mb-4 p-2 rounded max-w-sm ${
              message.__v === 0 ? 'bg-teal-500 text-white self-end' : 'bg-gray-600 text-white self-start'
            }`}
          >
            {message.mensaje}
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          className="flex-1 p-2 rounded-l bg-gray-700 text-white border border-gray-600"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Escribe un mensaje"
        />
        <button
          onClick={handleSendMessage}
          className="bg-teal-500 text-white p-2 rounded-r"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Foro;
