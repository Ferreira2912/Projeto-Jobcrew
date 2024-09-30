import React, { useState } from 'react';
import axios from 'axios';

function SentimentAnalysis() {
  const [content, setContent] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/api/analysis/analyze',
        { content },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setAnalysis(response.data.analise);
      setError('');
    } catch (error) {
      setError('Erro ao realizar a análise de sentimento e qualidade.');
      setAnalysis('');
    }
  };

  return (
    <div>
      <h2>Análise de Sentimento e Qualidade</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Digite o conteúdo para análise"
          required
          rows="5"
        />
        <button type="submit">Analisar</button>
      </form>

      {error && <p>{error}</p>}
      {analysis && (
        <div>
          <h3>Resultado da Análise:</h3>
          <pre>{analysis}</pre>
        </div>
      )}
    </div>
  );
}

export default SentimentAnalysis;
