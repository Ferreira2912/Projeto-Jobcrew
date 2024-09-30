const express = require('express');
const router = express.Router();
const { getChatGPTResponse } = require('../openai');

// Rota para gerar respostas automatizadas
router.post('/gerar-resposta', async (req, res) => {
  const { comentario } = req.body;
  const prompt = `Responda ao seguinte comentário de maneira profissional: "${comentario}".`;

  try {
    const resposta = await getChatGPTResponse(prompt);
    res.json({ resposta });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar resposta' });
  }
});

module.exports = router;
