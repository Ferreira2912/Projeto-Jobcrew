import React, { useState } from 'react';
import axios from 'axios';

function CreateArticle() {
  const [assunto, setAssunto] = useState('');
  const [resposta, setResposta] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post('/api/criar-esboco', { assunto });
      setResposta(result.data.resposta);
    } catch (error) {
      console.error('Erro ao gerar esboço:', error);
      setResposta('Erro ao gerar esboço, tente novamente mais tarde.');
    }
  };

  return (
    <div>
      <h2>Criar Esboço de Artigo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={assunto}
          onChange={(e) => setAssunto(e.target.value)}
          placeholder="Digite o assunto"
        />
        <button type="submit">Gerar Esboço</button>
      </form>
      {resposta && (
        <div>
          <h3>Esboço Gerado:</h3>
          <p>{resposta}</p>
        </div>
      )}
    </div>
  );
}

export default CreateArticle;
