const express = require('express');
const router = express.Router();
const { getUserStatistics } = require('../models/Activity');
const { authenticateToken } = require('../middleware/auth');

// Rota para obter estatísticas do usuário
router.get('/user-stats', authenticateToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    const stats = await getUserStatistics(userId);
    res.json({ stats });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
});

module.exports = router;
