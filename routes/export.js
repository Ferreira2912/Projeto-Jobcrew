const express = require('express');
const router = express.Router();
const pdf = require('html-pdf');
const { Parser } = require('json2csv');
const { authenticateToken } = require('../middleware/auth');
const { logActivity } = require('../models/Activity');

// Função para gerar o conteúdo do PDF
const generatePDF = (content) => {
  const html = `
    <html>
      <head>
        <title>Exportação de Conteúdo</title>
      </head>
      <body>
        <h1>Conteúdo Exportado</h1>
        <p>${content}</p>
      </body>
    </html>
  `;
  return html;
};

// Rota para exportar o conteúdo em PDF ou CSV
router.post('/export', authenticateToken, async (req, res) => {
  const { content, type } = req.body;

  try {
    if (type === 'pdf') {
      const html = generatePDF(content);
      pdf.create(html).toStream(async (err, stream) => {
        if (err) {
          return res.status(500).json({ error: 'Erro ao gerar o PDF' });
        }
        res.setHeader('Content-Type', 'application/pdf');
        stream.pipe(res);

        // Registrar a atividade de exportação em PDF
        await logActivity(req.user.userId, 'exportacao_pdf');
      });
    } else if (type === 'csv') {
      const parser = new Parser();
      const csv = parser.parse([{ content }]);
      res.setHeader('Content-Type', 'text/csv');
      res.attachment('conteudo.csv');
      res.send(csv);

      // Registrar a atividade de exportação em CSV
      await logActivity(req.user.userId, 'exportacao_csv');
    } else {
      res.status(400).json({ error: 'Tipo de arquivo inválido' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao gerar o arquivo' });
  }
});

module.exports = router;
