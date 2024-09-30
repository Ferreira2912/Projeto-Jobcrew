import React, { useState } from 'react';
import axios from 'axios';

function GenerateIdeas() {
  const [tema, setTema] = useState('');
  const [resposta, setResposta] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post('/api/gerar-ideias', { tema });
      setResposta(result.data.resposta);
    } catch (error) {
      console.error('Erro ao gerar ideias:', error);
      setResposta('Erro ao gerar ideias, tente novamente mais tarde.');
    }
  };

  return (
    <div>
      <h2>Gerar Ideias para Postagens</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={tema}
          onChange={(e) => setTema(e.target.value)}
          placeholder="Digite o tema"
        />
        <button type="submit">Gerar</button>
      </form>
      {resposta && (
        <div>
          <h3>Ideias Geradas:</h3>
          <p>{resposta}</p>
        </div>
      )}
    </div>
  );
}

export default GenerateIdeas;
