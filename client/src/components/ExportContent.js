import React, { useState } from 'react';
import axios from 'axios';

function ExportContent() {
  const [content, setContent] = useState('');
  const [type, setType] = useState('pdf');
  const [error, setError] = useState('');

  const handleExport = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/api/export/export',
        { content, type },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          responseType: 'blob', // Importante para baixar o arquivo
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `conteudo.${type}`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      setError('Erro ao exportar o conteúdo.');
    }
  };

  return (
    <div>
      <h2>Exportar Conteúdo</h2>
      <form onSubmit={handleExport}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Digite o conteúdo para exportação"
          required
          rows="5"
        />
        <div>
          <label>Tipo de Exportação:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="pdf">PDF</option>
            <option value="csv">CSV</option>
          </select>
        </div>
        <button type="submit">Exportar</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default ExportContent;
