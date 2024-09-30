import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Templates() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await axios.get('/api/templates/list', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTemplates(response.data.templates);
    } catch (error) {
      setError('Erro ao buscar os templates.');
    }
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  return (
    <div>
      <h2>Templates Pré-definidos</h2>
      {error && <p>{error}</p>}
      <div>
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => handleTemplateSelect(template)}
          >
            {template.title}
          </button>
        ))}
      </div>

      {selectedTemplate && (
        <div>
          <h3>{selectedTemplate.title}</h3>
          <pre>{selectedTemplate.content}</pre>
        </div>
      )}
    </div>
  );
}

export default Templates;
