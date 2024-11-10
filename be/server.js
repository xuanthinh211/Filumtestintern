const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'https://filumtestintern.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

app.post('/api/save-result', (req, res) => {
  const result = req.body;
  console.log('Result received:', result);

  // Lưu kết quả vào file result.json
  const filePath = path.join(__dirname, 'result.json');
  fs.writeFile(filePath, JSON.stringify(result, null, 2), (err) => {
    if (err) {
      console.error('Error saving result:', err);
      return res.status(500).send('Error saving result');
    }
    res.status(200).send('Result saved successfully');
  });
});

app.get('/api/result.json', (req, res) => {
  const filePath = path.join(__dirname, 'result.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading result:', err);
      return res.status(500).send('Error reading result');
    }
    res.json(JSON.parse(data));
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
