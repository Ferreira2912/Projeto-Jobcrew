import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const response = await axios.get('/api/suggestions/contextual-suggestions', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSuggestions(response.data.sugestoes);
    } catch (error) {
      setError('Erro ao buscar sugestões baseadas no histórico.');
    }
  };

  return (
    <div>
      <h2>Sugestões Baseadas no Contexto</h2>
      {error && <p>{error}</p>}
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
}

export default Suggestions;
