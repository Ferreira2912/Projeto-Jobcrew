import React, { useState } from 'react';
import axios from 'axios';

function Calendar() {
  const [tema, setTema] = useState('');
  const [periodo, setPeriodo] = useState(4); // Período padrão de 4 semanas
  const [frequencia, setFrequencia] = useState(3); // Frequência padrão de 3 postagens por semana
  const [calendario, setCalendario] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/api/calendar/generate',
        { tema, periodo, frequencia },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setCalendario(response.data.calendario);
    } catch (error) {
      setError('Erro ao gerar o calendário de conteúdo');
    }
  };

  return (
    <div>
      <h2>Geração de Calendário de Conteúdo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tema:</label>
          <input
            type="text"
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            placeholder="Digite o tema"
            required
          />
        </div>
        <div>
          <label>Período (semanas):</label>
          <input
            type="number"
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            min="1"
            required
          />
        </div>
        <div>
          <label>Frequência (postagens por semana):</label>
          <input
            type="number"
            value={frequencia}
            onChange={(e) => setFrequencia(e.target.value)}
            min="1"
            required
          />
        </div>
        <button type="submit">Gerar Calendário</button>
      </form>

      {error && <p>{error}</p>}
      {calendario && (
        <div>
          <h3>Calendário Gerado:</h3>
          <p>{calendario}</p>
        </div>
      )}
    </div>
  );
}

export default Calendar;
