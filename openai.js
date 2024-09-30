const OpenAI = require('openai');

// Configuração da API com a chave armazenada no arquivo .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Sua chave de API armazenada no arquivo .env
});

// Função para gerar uma resposta usando o ChatGPT
async function getChatGPTResponse(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4', // Ou 'gpt-4' se disponível
      messages: [{ role: 'user', content: prompt }],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Erro ao chamar a API da OpenAI:', error.response ? error.response.data : error.message);
    throw new Error('Erro ao gerar resposta da OpenAI');
  }
}

module.exports = { getChatGPTResponse };
