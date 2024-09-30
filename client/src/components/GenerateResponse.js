import React, { useState } from 'react';
import axios from 'axios';

function GenerateResponse() {
  const [comentario, setComentario] = useState('');
  const [resposta, setResposta] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post('/api/gerar-resposta', { comentario });
      setResposta(result.data.resposta);
    } catch (error) {
      console.error('Erro ao gerar resposta:', error);
      setResposta('Erro ao gerar resposta, tente novamente mais tarde.');
    }
  };

  return (
    <div>
      <h2>Gerar Resposta a Comentários</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          placeholder="Digite o comentário"
        />
        <button type="submit">Gerar Resposta</button>
      </form>
      {resposta && (
        <div>
          <h3>Resposta Gerada:</h3>
          <p>{resposta}</p>
        </div>
      )}
    </div>
  );
}

export default GenerateResponse;
