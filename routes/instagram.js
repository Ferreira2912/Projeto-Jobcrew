const express = require('express');
const router = express.Router();
const axios = require('axios');

// Token de Acesso da Graph API
const ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN; // Coloque no .env

// ID da página do Facebook (vinculada ao Instagram)
const FACEBOOK_PAGE_ID = process.env.FACEBOOK_PAGE_ID; // Coloque no .env

// Rota para publicar no Instagram ou Facebook
router.post('/publish', async (req, res) => {
  const { content, imageUrl, platform } = req.body;

  try {
    let apiUrl = `https://graph.facebook.com/v17.0/${FACEBOOK_PAGE_ID}/feed`;

    // Se for Instagram, a URL da API muda para o endpoint de media
    if (platform === 'Instagram') {
      apiUrl = `https://graph.facebook.com/v17.0/${FACEBOOK_PAGE_ID}/media`;
    }

    // Fazer o upload de imagem (opcional)
    const mediaObjectId = imageUrl
      ? await axios.post(
          apiUrl,
          {
            image_url: imageUrl,
            caption: content,
            access_token: ACCESS_TOKEN,
          }
        ).then((res) => res.data.id)
      : null;

    // Publicar o conteúdo no feed
    const postResponse = await axios.post(
      `https://graph.facebook.com/v17.0/${FACEBOOK_PAGE_ID}/feed`,
      {
        message: content,
        media_id: mediaObjectId || null,
        access_token: ACCESS_TOKEN,
      }
    );

    res.json({ success: true, postId: postResponse.data.id });
  } catch (error) {
    console.error('Erro ao publicar:', error);
    res.status(500).json({ error: 'Erro ao publicar a postagem.' });
  }
});

module.exports = router;
