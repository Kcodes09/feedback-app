const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5000;

const DATA_FILE = path.join('/tmp', 'feedbacks.json');

app.use(cors());
app.use(express.json());

// GET all feedbacks
app.get('/api/feedbacks', (req, res) => {
  fs.readFile(DATA_FILE, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Could not read file' });
    const feedbacks = JSON.parse(data || '[]');
    res.json(feedbacks.reverse()); // Newest first
  });
});

// POST new feedback
app.post('/api/feedbacks', (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message required' });
  }

  const newFeedback = {
    id: Date.now(),
    name,
    message,
    timestamp: new Date(),
  };

  fs.readFile(DATA_FILE, 'utf-8', (err, data) => {
    let feedbacks = [];
    if (!err && data) {
      feedbacks = JSON.parse(data);
    }

    feedbacks.push(newFeedback);

    fs.writeFile(DATA_FILE, JSON.stringify(feedbacks, null, 2), (err) => {
      if (err) return res.status(500).json({ error: 'Could not save feedback' });
      res.status(201).json(newFeedback);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
