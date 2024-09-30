const express = require('express');
const axios = require('axios');
const router = express.Router();

// Token de Acesso do LinkedIn
const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;

// Rota para publicar no LinkedIn
router.post('/publish', async (req, res) => {
  const { content } = req.body;

  try {
    const postResponse = await axios.post(
      'https://api.linkedin.com/v2/shares',
      {
        owner: 'urn:li:person:' + process.env.LINKEDIN_USER_ID, // Seu ID de usuário no LinkedIn
        subject: 'Postagem Automática',
        text: {
          text: content,
        },
        distribution: {
          linkedInDistributionTarget: {},
        },
      },
      {
        headers: {
          Authorization: `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
          'X-Restli-Protocol-Version': '2.0.0',
        },
      }
    );

    res.json({ success: true, postId: postResponse.data.id });
  } catch (error) {
    console.error('Erro ao postar no LinkedIn:', error);
    res.status(500).json({ error: 'Erro ao publicar no LinkedIn.' });
  }
});

module.exports = router;
