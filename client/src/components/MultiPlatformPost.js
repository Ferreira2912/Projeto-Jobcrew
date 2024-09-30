import React, { useState, useEffect } from 'react';

function MultiPlatformPost() {
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [schedule, setSchedule] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [hasImage, setHasImage] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Plataformas disponíveis
  const platforms = ['Instagram', 'Facebook', 'LinkedIn', 'Twitter'];

  // Sugestões específicas para cada plataforma
  const platformSuggestions = {
    Instagram: 'Use até 30 hashtags. Inclua emojis para aumentar o engajamento. Foco em fotos e vídeos.',
    Facebook: 'Postagens mais longas são aceitas. Use links e imagens para aumentar o engajamento.',
    LinkedIn: 'Foco em postagens profissionais. Utilize artigos e evite uso excessivo de emojis.',
    Twitter: 'Limite de 280 caracteres. Use hashtags populares e mencione usuários relevantes (@).',
  };

  // Função para selecionar/desmarcar plataformas
  const handlePlatformChange = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  // Função para atualizar o conteúdo da postagem
  const handleContentChange = (e) => {
    setPostContent(e.target.value);
  };

  // Função para definir o horário de agendamento
  const handleScheduleChange = (e) => {
    setSchedule(e.target.value);
  };

  // Função para gerar sugestões com base nas plataformas selecionadas
  useEffect(() => {
    const newSuggestions = selectedPlatforms.map(
      (platform) => platformSuggestions[platform]
    );
    setSuggestions(newSuggestions);
  }, [selectedPlatforms]);

  // Função para selecionar se haverá imagem
  const handleImageSelection = () => {
    setHasImage((prev) => !prev);
    if (!hasImage) {
      setImage(null); // Remove imagem se desmarcar a opção
      setImagePreview('');
    }
  };

  // Função para fazer o upload da imagem
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Mostra uma pré-visualização da imagem
    }
  };

  // Função para enviar postagens agendadas
  const handleSubmit = async () => {
    if (selectedPlatforms.length === 0) {
      alert('Por favor, selecione ao menos uma plataforma.');
      return;
    }
    if (!postContent) {
      alert('Por favor, insira o conteúdo da postagem.');
      return;
    }
    if (!schedule) {
      alert('Por favor, selecione uma data e hora para agendar a postagem.');
      return;
    }

    const formData = new FormData();
    formData.append('content', postContent);
    formData.append('schedule', schedule);
    if (image) {
      formData.append('image', image); // Adiciona a imagem ao formData se houver
    }

    try {
      for (const platform of selectedPlatforms) {
        const response = await fetch(`/api/${platform.toLowerCase()}/publish`, {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        console.log(`${platform} post ID:`, data.postId || data.tweetId);
      }
      alert('Postagens agendadas com sucesso!');
    } catch (error) {
      console.error('Erro ao publicar:', error);
      alert('Erro ao publicar as postagens.');
    }
  };

  return (
    <div className="multi-platform-post">
      <h2>Hub de Postagem Multiplataforma</h2>

      {/* Seção de Seleção de Plataformas */}
      <div className="platform-selection">
        <h3>Selecione as Plataformas</h3>
        {platforms.map((platform) => (
          <div key={platform}>
            <input
              type="checkbox"
              id={platform}
              value={platform}
              checked={selectedPlatforms.includes(platform)}
              onChange={() => handlePlatformChange(platform)}
            />
            <label htmlFor={platform}>{platform}</label>
          </div>
        ))}
      </div>

      {/* Editor de Postagem */}
      <div className="post-editor">
        <h3>Criação de Postagem</h3>
        <textarea
          value={postContent}
          onChange={handleContentChange}
          placeholder="Digite sua postagem aqui"
          rows="6"
        />
      </div>

      {/* Seletor de Imagem */}
      <div className="image-selection">
        <h3>Incluir uma Imagem?</h3>
        <input
          type="checkbox"
          checked={hasImage}
          onChange={handleImageSelection}
        />
        <label>Sim</label>

        {hasImage && (
          <div className="image-upload">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {imagePreview && (
              <div className="image-preview">
                <h4>Pré-visualização da Imagem:</h4>
                <img src={imagePreview} alt="Pré-visualização" width="200" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sugestões Baseadas na Plataforma */}
      {selectedPlatforms.length > 0 && (
        <div className="platform-suggestions">
          <h3>Sugestões para Otimização</h3>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Campo de Agendamento */}
      <div className="schedule-post">
        <h3>Agendamento</h3>
        <input
          type="datetime-local"
          value={schedule}
          onChange={handleScheduleChange}
        />
      </div>

      {/* Botão de Envio */}
      <div className="submit-section">
        <button onClick={handleSubmit}>Agendar Postagem</button>
      </div>

      {/* Pré-visualização de Postagem */}
      <div className="post-preview">
        <h3>Pré-visualização</h3>
        {selectedPlatforms.length === 0 ? (
          <p>Selecione uma plataforma para visualizar a postagem.</p>
        ) : (
          <div>
            {selectedPlatforms.map((platform) => (
              <div key={platform} className="platform-preview">
                <h4>{platform}</h4>
                <p>{postContent}</p>
                <p><strong>Agendado para:</strong> {schedule}</p>
                {hasImage && imagePreview && (
                  <img src={imagePreview} alt="Pré-visualização" width="100" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MultiPlatformPost;
