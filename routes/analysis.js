const express = require('express');
const router = express.Router();
const { getChatGPTResponse } = require('../openai');
const { authenticateToken } = require('../middleware/auth');
const { logActivity } = require('../models/Activity');

// Rota para análise de sentimento e qualidade
router.post('/analyze', authenticateToken, async (req, res) => {
  const { content } = req.body;

  try {
    // Gera o prompt para o ChatGPT analisar o sentimento e a qualidade do conteúdo
    const prompt = `
      Avalie o seguinte texto em termos de sentimento (positivo, negativo ou neutro) e qualidade (clareza, fluidez e otimização SEO):
      Texto: "${content}"
      Forneça uma resposta estruturada com as seguintes categorias:
      - Sentimento:
      - Qualidade (clareza, fluidez):
      - Sugestões de melhoria para SEO:
    `;

    const resposta = await getChatGPTResponse(prompt);
    await logActivity(req.user.userId, 'geracao_ideias'); // Registra a atividade
    res.json({ analise: resposta });
  } catch (error) {
    console.error('Erro ao realizar a análise:', error);
    res.status(500).json({ error: 'Erro ao realizar a análise de sentimento e qualidade.' });
  }
});

module.exports = router;
