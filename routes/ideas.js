const express = require('express');
const router = express.Router();
const { getChatGPTResponse } = require('../openai'); // Importe a função da OpenAI
const { logActivity } = require('../models/Activity');

// Rota para gerar ideias para postagens
router.post('/gerar-ideias', async (req, res) => {
  const { tema } = req.body; // Obtém o tema do corpo da requisição
  const prompt = `Forneça ideias criativas para postagens nas redes sociais sobre o tema: "${tema}".`;

  try {
    const resposta = await getChatGPTResponse(prompt); // Chama a função para obter a resposta da OpenAI
    await logActivity(req.user.userId, 'geracao_ideias'); // Registra a atividade
    res.json({ resposta });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar ideias' });
  }
});

module.exports = router;
