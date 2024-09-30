import React, { useState } from 'react';
import axios from 'axios';

function SeoSuggestions() {
  const [content, setContent] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/api/seo/suggest-seo',
        { content },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setSuggestions(response.data.sugestoes);
      setError('');
    } catch (error) {
      setError('Erro ao gerar sugestões de SEO.');
      setSuggestions('');
    }
  };

  return (
    <div>
      <h2>Sugestões de Melhoria de SEO</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Digite o conteúdo para análise de SEO"
          required
          rows="5"
        />
        <button type="submit">Analisar SEO</button>
      </form>

      {error && <p>{error}</p>}
      {suggestions && (
        <div>
          <h3>Resultado da Análise:</h3>
          <pre>{suggestions}</pre>
        </div>
      )}
    </div>
  );
}

export default SeoSuggestions;
