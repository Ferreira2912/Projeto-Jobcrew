require("dotenv").config();
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
