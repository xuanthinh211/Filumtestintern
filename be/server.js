const express = require('express');
const cors = require('cors');

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
app.post('/api/save-result', (req, res) => {
  const result = req.body;
  console.log('Result received:', result);
  res.status(200).send('Result saved successfully');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
