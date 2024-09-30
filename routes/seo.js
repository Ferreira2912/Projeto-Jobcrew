const express = require('express');
const router = express.Router();
const { getChatGPTResponse } = require('../openai');
const { authenticateToken } = require('../middleware/auth');

// Rota para sugestões de melhoria de SEO
router.post('/suggest-seo', authenticateToken, async (req, res) => {
  const { content } = req.body;

  try {
    // Gera o prompt para o ChatGPT fornecer sugestões de SEO
    const prompt = `
      Analise o seguinte conteúdo em termos de SEO e sugira melhorias:
      Texto: "${content}"
      Forneça uma análise de:
      - Palavras-chave relevantes:
      - Densidade de palavras-chave:
      - Sugestões de meta descrição:
      - Melhorias gerais para SEO:
    `;

    const resposta = await getChatGPTResponse(prompt);
    res.json({ sugestoes: resposta });
  } catch (error) {
    console.error('Erro ao gerar sugestões de SEO:', error);
    res.status(500).json({ error: 'Erro ao gerar sugestões de SEO.' });
  }
});

module.exports = router;
