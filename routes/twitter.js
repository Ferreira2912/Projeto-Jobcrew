const express = require('express');
const Twit = require('twit');
const router = express.Router();

// Configurar o Twit com as chaves da API
const twitterClient = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// Rota para publicar no Twitter
router.post('/publish', (req, res) => {
  const { content } = req.body;

  twitterClient.post('statuses/update', { status: content }, (err, data, response) => {
    if (err) {
      console.error('Erro ao postar no Twitter:', err);
      res.status(500).json({ error: 'Erro ao publicar no Twitter.' });
    } else {
      res.json({ success: true, tweetId: data.id_str });
    }
  });
});

module.exports = router;
