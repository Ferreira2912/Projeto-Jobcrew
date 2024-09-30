const express = require('express');
const router = express.Router();
const { getChatGPTResponse } = require('../openai');

// Rota para criar esboços de artigos
router.post('/criar-esboco', async (req, res) => {
  const { assunto } = req.body;
  const prompt = `Crie um esboço detalhado para um artigo sobre: "${assunto}".`;

  try {
    const resposta = await getChatGPTResponse(prompt);
    res.json({ resposta });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar esboço' });
  }
});

module.exports = router;
