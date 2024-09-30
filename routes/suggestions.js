const express = require('express');
const router = express.Router();
const { getUserHistory } = require('../models/History');
const { getChatGPTResponse } = require('../openai');
const { authenticateToken } = require('../middleware/auth');

// Rota para gerar sugestões baseadas no histórico do usuário
router.get('/contextual-suggestions', authenticateToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    // Busca o histórico de gerações do usuário
    const history = await getUserHistory(userId);
    
    if (!history.length) {
      return res.status(400).json({ error: 'Histórico vazio. Nenhuma sugestão disponível.' });
    }

    // Pega a entrada mais frequente do histórico
    const mostFrequentEntry = history[0].entrada; // Você pode refinar isso para pegar a entrada mais frequente

    // Usa o ChatGPT para gerar sugestões baseadas no histórico
    const prompt = `Sugira novas ideias relacionadas ao tema: "${mostFrequentEntry}".`;
    const resposta = await getChatGPTResponse(prompt);

    res.json({ sugestoes: resposta });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar sugestões baseadas no contexto.' });
  }
});

module.exports = router;
