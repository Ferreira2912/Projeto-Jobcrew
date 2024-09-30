const express = require('express');
const router = express.Router();
const { getChatGPTResponse } = require('../openai');
const { authenticateToken } = require('../middleware/auth');

// Rota para gerar um calendário de conteúdo
router.post('/generate', authenticateToken, async (req, res) => {
  const { tema, periodo, frequencia } = req.body; // Recebe tema, período e frequência

  try {
    // Gera o prompt para o ChatGPT sugerir um calendário de postagens
    const prompt = `Crie um calendário de postagens para o tema "${tema}" com uma frequência de ${frequencia} postagens por semana durante ${periodo} semanas.`;
    const resposta = await getChatGPTResponse(prompt);

    res.json({ calendario: resposta });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar o calendário de conteúdo' });
  }
});

module.exports = router;
