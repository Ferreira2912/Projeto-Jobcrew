const express = require('express');
const router = express.Router();
const { addHistoryItem, getHistory, toggleFavorite } = require('../models/History');

// Rota para adicionar um item ao histórico
router.post('/add', async (req, res) => {
  const { tipo, entrada, resposta } = req.body;
  try {
    const id = await addHistoryItem({ tipo, entrada, resposta });
    res.json({ message: 'Item adicionado ao histórico', id });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar item ao histórico' });
  }
});

// Rota para visualizar todo o histórico
router.get('/', async (req, res) => {
  try {
    const history = await getHistory();
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar histórico' });
  }
});

// Rota para alternar o estado de favorito
router.post('/toggle-favorite/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await toggleFavorite(id);
    res.json({ message: 'Favorito atualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar favorito' });
  }
});

module.exports = router;
