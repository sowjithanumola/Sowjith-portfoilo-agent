const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static('.'));

const LYZR_API_KEY = 'sk-default-IEBvkuwYTh2jj3UkI2r74NE1lDnWZoKL';
const LYZR_ENDPOINT = 'https://voice-livekit.studio.lyzr.ai/v1/sessions/start';

app.post('/api/voice-session', async (req, res) => {
  try {
    const { agentId, userIdentity, roomName } = req.body;

    const response = await fetch(LYZR_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': LYZR_API_KEY
      },
      body: JSON.stringify({
        agentId,
        userIdentity,
        roomName
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Lyzr API error:', data);
      return res.status(response.status).json({
        error: data.message || 'Voice session failed'
      });
    }

    res.json(data);

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
