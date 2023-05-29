const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
// Define your routes here
console.log('Hello World!');
let blogPosts = [];

// Create a new blog post
app.post('/api/blogs', (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: Date.now(), title, content };
  blogPosts.push(newPost);
  res.status(201).json(newPost);
});

// Read all blog posts
app.get('/api/blogs', (req, res) => {
  res.json(blogPosts);
});

// Read a specific blog post
app.get('/api/blogs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = blogPosts.find((post) => post.id === id);

  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: 'Blog post not found' });
  }
});

// Update a blog post
app.put('/api/blogs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  const post = blogPosts.find((post) => post.id === id);

  if (post) {
    post.title = title || post.title;
    post.content = content || post.content;
    res.json(post);
  } else {
    res.status(404).json({ error: 'Blog post not found' });
  }
});

// Delete a blog post
app.delete('/api/blogs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = blogPosts.findIndex((post) => post.id === id);

  if (index !== -1) {
    const deletedPost = blogPosts.splice(index, 1);
    res.json(deletedPost[0]);
  } else {
    res.status(404).json({ error: 'Blog post not found' });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

