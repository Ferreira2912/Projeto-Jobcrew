const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

// Lista de templates pré-definidos
const templates = [
  {
    id: 1,
    type: 'postagem_rede_social',
    title: 'Postagem para Redes Sociais',
    content: `Olá, pessoal! Hoje estou muito animado para compartilhar com vocês... [Descreva sua mensagem principal]. Não se esqueça de seguir a página para mais atualizações! #hashtag`,
  },
  {
    id: 2,
    type: 'esboco_artigo_blog',
    title: 'Esboço de Artigo para Blog',
    content: `Título: [Insira o título do artigo]\n\nIntrodução: [Introduza o tema do artigo]\n\nParágrafo 1: [Primeiro ponto a ser discutido]\n\nParágrafo 2: [Segundo ponto]\n\nConclusão: [Resumo e chamada para ação]`,
  },
  {
    id: 3,
    type: 'email_promocional',
    title: 'E-mail Promocional',
    content: `Olá [Nome do Cliente],\n\nEstamos empolgados em anunciar nossa nova promoção! Aproveite um desconto de [X%] em todos os nossos produtos até [data]. Não perca essa oportunidade!\n\nClique aqui para saber mais: [Link]\n\nAtenciosamente,\n[Nome da Empresa]`,
  }
];

// Rota para obter a lista de templates
router.get('/list', authenticateToken, (req, res) => {
  res.json({ templates });
});

module.exports = router;
