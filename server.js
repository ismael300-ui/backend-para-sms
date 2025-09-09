// server.js
const express = require('express');
const fetch = require('node-fetch'); // instalar con npm i node-fetch@2
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // permite que tu frontend en GitHub Pages haga peticiones

const TEXTBELT_API_KEY = 'textbelt'; // clave gratuita

app.post('/enviar-sms', async (req, res) => {
  const { numero, mensaje } = req.body;

  try {
    const response = await fetch('https://textbelt.com/text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: numero,
        message: mensaje,
        key: TEXTBELT_API_KEY
      })
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

