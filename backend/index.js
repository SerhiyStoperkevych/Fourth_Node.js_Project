const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors module
const fs = require('fs'); // Import fs module
const path = require('path'); // Import path module

const app = express();
const port = 3001; // or any port you prefer

app.use(bodyParser.json());
app.use(cors()); // Use cors middleware

let items = [];

// Read items from items.json file
const itemsFilePath = path.join(__dirname, 'items.json');

fs.readFile(itemsFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading items.json:', err);
  } else {
    items = JSON.parse(data);
  }
});

// Example API routes
app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);

  // Save the new item to items.json file
  fs.writeFile(itemsFilePath, JSON.stringify(items, null, 2), (err) => {
    if (err) {
      console.error('Error writing to items.json:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(201).json(newItem);
    }
  });
});

app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  items = items.filter(item => item.id !== parseInt(id));

  // Save the updated items to items.json file
  fs.writeFile(itemsFilePath, JSON.stringify(items, null, 2), (err) => {
    if (err) {
      console.error('Error writing to items.json:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.sendStatus(204);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
