const express = require('express');
const router = express.Router();
const axios = require('axios');
const { authenticateToken } = require('../middleware/auth');

// Token de acesso da API do Instagram
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN; // Coloque no .env

// ID da Página do Facebook conectada ao Instagram
const FACEBOOK_PAGE_ID = process.env.FACEBOOK_PAGE_ID; // Coloque no .env

// Rota para publicar uma imagem ou legenda no Instagram
router.post('/publish', authenticateToken, async (req, res) => {
  const { imageUrl, caption } = req.body;

  try {
    // Etapa 1: Carregar a imagem no Instagram (se houver)
    let mediaObjectId = null;
    if (imageUrl) {
      const uploadResponse = await axios.post(
        `https://graph.facebook.com/v17.0/${FACEBOOK_PAGE_ID}/photos`,
        {
          image_url: imageUrl,
          caption: caption,
          access_token: INSTAGRAM_ACCESS_TOKEN,
        }
      );
      mediaObjectId = uploadResponse.data.id;
    }

    // Etapa 2: Publicar a imagem ou a legenda
    const publishResponse = await axios.post(
      `https://graph.facebook.com/v17.0/${FACEBOOK_PAGE_ID}/feed`,
      {
        media_id: mediaObjectId,
        caption: caption,
        access_token: INSTAGRAM_ACCESS_TOKEN,
      }
    );

    res.json({ success: true, postId: publishResponse.data.id });
  } catch (error) {
    console.error('Erro ao publicar no Instagram:', error);
    res.status(500).json({ error: 'Erro ao publicar no Instagram' });
  }
});

module.exports = router;
    