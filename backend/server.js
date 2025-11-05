const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data.json');

let data = { terms: [], graph: { nodes: [], edges: [] } };
if (fs.existsSync(DATA_FILE)) {
  try {
    data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (err) {
    console.error('Failed to parse data.json:', err);
  }
} else {
  console.warn('Data file not found at', DATA_FILE);
}

// CORS for local development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  next();
});

app.get('/api/terms', (req, res) => {
  res.json(data.terms);
});

app.get('/api/terms/:id', (req, res) => {
  const t = data.terms.find(x => x.id === req.params.id);
  if (!t) return res.status(404).json({ error: 'Not found' });
  res.json(t);
});

app.get('/api/graph', (req, res) => {
  res.json(data.graph);
});

// optional: simple health-check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// static serve if frontend build copied into this folder
const publicDir = path.join(__dirname, 'public');
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
  app.get('*', (req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend listening on http://0.0.0.0:${PORT}`);
});