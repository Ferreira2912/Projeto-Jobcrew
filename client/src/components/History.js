import React, { useState, useEffect } from 'react';
import axios from 'axios';

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get('/api/history');
      setHistory(response.data);
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
    }
  };

  const toggleFavorite = async (id) => {
    try {
      await axios.post(`/api/history/toggle-favorite/${id}`);
      fetchHistory();  // Atualiza o histórico após alternar o favorito
    } catch (error) {
      console.error('Erro ao alternar favorito:', error);
    }
  };

  return (
    <div>
      <h2>Histórico de Gerações</h2>
      <ul>
        {history.map((item) => (
          <li key={item._id}>
            <p><strong>Tipo:</strong> {item.tipo}</p>
            <p><strong>Entrada:</strong> {item.entrada}</p>
            <p><strong>Resposta:</strong> {item.resposta}</p>
            <p><strong>Data:</strong> {new Date(item.data).toLocaleString()}</p>
            <button onClick={() => toggleFavorite(item._id)}>
              {item.favorito ? 'Remover dos Favoritos' : 'Marcar como Favorito'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
