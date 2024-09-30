const { connectToDatabase } = require('../db');
const bcrypt = require('bcryptjs');

// Função para criar um novo usuário
async function createUser(email, password) {
  const db = await connectToDatabase();
  const hashedPassword = await bcrypt.hash(password, 10); // Criptografa a senha

  const result = await db.collection('users').insertOne({
    email,
    password: hashedPassword,
    favoritos: [], // Inicializa favoritos como uma lista vazia
  });

  return result.insertedId;
}

// Função para buscar um usuário pelo email
async function findUserByEmail(email) {
  const db = await connectToDatabase();
  return await db.collection('users').findOne({ email });
}

module.exports = { createUser, findUserByEmail };
