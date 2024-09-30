import React, { useState } from 'react';
import axios from 'axios';

function InstagramPost() {
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/api/instagram/publish',
        { imageUrl, caption },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setSuccess(`Post publicado com sucesso! ID do Post: ${response.data.postId}`);
      setError('');
    } catch (error) {
      setError('Erro ao publicar no Instagram.');
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Publicar no Instagram</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Legenda:</label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Digite a legenda da postagem"
            required
          />
        </div>
        <div>
          <label>URL da Imagem (opcional):</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="URL da imagem"
          />
        </div>
        <button type="submit">Publicar no Instagram</button>
      </form>

      {success && <p>{success}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default InstagramPost;
