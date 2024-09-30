const { connectToDatabase } = require('../db');

// Função para registrar uma nova atividade
async function logActivity(userId, activityType) {
  const db = await connectToDatabase();
  const result = await db.collection('atividades').insertOne({
    userId,
    activityType,
    date: new Date(),
  });
  return result.insertedId;
}

// Função para buscar as estatísticas do usuário
async function getUserStatistics(userId) {
  const db = await connectToDatabase();
  const stats = await db.collection('atividades').aggregate([
    { $match: { userId } },
    { $group: { _id: "$activityType", count: { $sum: 1 } } }
  ]).toArray();
  return stats;
}

module.exports = { logActivity, getUserStatistics };
