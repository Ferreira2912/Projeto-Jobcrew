const { MongoClient } = require('mongodb');

async function connectToDatabase() {
  const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  try {
    await client.connect();
    console.log('Conectado ao MongoDB');
    return client.db();  // Retorna a instância do banco de dados
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);  // Encerra o processo se a conexão falhar
  }
}

module.exports = { connectToDatabase };
