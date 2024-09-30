const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('../db');

// Função para adicionar um item ao histórico
async function addHistoryItem({ tipo, entrada, resposta, favorito = false }) {
  const db = await connectToDatabase();
  const result = await db.collection('historico').insertOne({
    tipo,
    entrada,
    resposta,
    favorito,
    data: new Date(),
  });
  return result.insertedId;
}

// Função para buscar todo o histórico
async function getHistory() {
  const db = await connectToDatabase();
  return await db.collection('historico').find({}).toArray();
}

// Função para marcar como favorito
async function toggleFavorite(id) {
  const db = await connectToDatabase();
  const item = await db.collection('historico').findOne({ _id: ObjectId(id) });
  if (item) {
    return await db.collection('historico').updateOne(
      { _id: ObjectId(id) },
      { $set: { favorito: !item.favorito } }
    );
  }
  throw new Error('Item não encontrado');
}

// Exporte todas as funções de uma vez só
module.exports = { addHistoryItem, getHistory, toggleFavorite };
