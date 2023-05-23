const express = require('express');
const app = express();

// Endpoint to get 20 posts
app.get('/post', (req, res) => {
  const posts = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, title: `Post ${i + 1}` }));
  res.json(posts);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
