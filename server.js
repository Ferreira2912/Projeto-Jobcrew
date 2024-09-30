require("dotenv").config();
const cron = require('node-cron');
const express = require("express");
const { connectToDatabase } = require("./db");
const ideasRouter = require("./routes/ideas"); // Importe a rota de ideias
const articlesRouter = require("./routes/articles");
const responsesRouter = require("./routes/responses");
const historyRouter = require("./routes/history");
const authRouter = require("./routes/auth");
const suggestionsRouter = require("./routes/suggestions");
const calendarRouter = require("./routes/calendar");
const instagramRouter = require('./routes/instagram');
const analysisRouter = require('./routes/analysis');
const exportRouter = require('./routes/export');
const statsRouter = require('./routes/stats');
const seoRouter = require('./routes/seo');
const templatesRouter = require('./routes/templates');  

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Para lidar com JSON no corpo das requisições

// Conectar a rota de ideias ao caminho /api
app.use("/api", ideasRouter);
app.use("/api", articlesRouter);
app.use("/api", responsesRouter);
app.use("/api/history", historyRouter);
app.use("/api/auth", authRouter);
app.use("/api/suggestions", suggestionsRouter);
app.use('/api/calendar', calendarRouter);
app.use('/api/instagram', instagramRouter);
app.use('/api/analysis', analysisRouter);
app.use('/api/export', exportRouter);
app.use('/api/stats', statsRouter);
app.use('/api/seo', seoRouter);
app.use('/api/templates', templatesRouter);

app.get("/", (req, res) => {
  res.send("API do Projeto Jobcrew está funcionando!");
});

// Conectar ao banco de dados e iniciar o servidor
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao iniciar o servidor:", error);
  });

  async function processScheduledPosts() {
    try {
      const pendingPosts = await getPendingPosts();
  
      for (const post of pendingPosts) {
        const platformRequests = [];
        
        // Verifica cada plataforma e faz a postagem
        if (post.platforms.facebook) {
          platformRequests.push(axios.post('/api/facebook/publish', { message: post.content.facebook }));
        }
        if (post.platforms.linkedin) {
          platformRequests.push(axios.post('/api/linkedin/publish', { message: post.content.linkedin }));
        }
        if (post.platforms.twitter) {
          platformRequests.push(axios.post('/api/twitter/publish', { message: post.content.twitter }));
        }
        if (post.platforms.instagram) {
          platformRequests.push(axios.post('/api/instagram/publish', { message: post.content.instagram }));
        }
  
        await Promise.all(platformRequests);
  
        // Atualiza o status para 'posted' após o sucesso
        await updatePostStatus(post._id, 'posted');
        console.log(`Postagem ${post._id} realizada com sucesso!`);
      }
    } catch (error) {
      console.error('Erro ao processar postagens agendadas:', error);
    }
  }
  
  // Agendamento para verificar postagens a cada minuto
  cron.schedule('* * * * *', processScheduledPosts);