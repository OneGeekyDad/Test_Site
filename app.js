const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/Post');
const path = require('path');
const app = express();

const PORT = 3000;
const MONGO_URI = 'mongodb://localhost:27017/blogApp'; // Change if using Atlas

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.render('index', { posts });
});

app.get('/post/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    res.render('post', { post });
  } else {
    res.status(404).send('Post not found');
  }
});

app.get('/new', (req, res) => {
  res.render('new');
});

app.post('/new', async (req, res) => {
  const { title, content } = req.body;
  await Post.create({ title, content });
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Blog app running at http://localhost:${PORT}`);
});
// This code sets up a simple blog application using Express and MongoDB. It connects to a MongoDB database, defines routes for viewing all posts, viewing a single post, and creating a new post, and uses EJS as the templating engine. The app listens on port 3000.
// The MongoDB connection string is set to a local MongoDB instance, but can be changed to connect to a remote database if needed. The app serves static files from the 'public' directory and uses URL-encoded data for form submissions.
// The app uses Mongoose to interact with the MongoDB database, defining a schema for blog posts with title and content fields. The posts are sorted by creation date in descending order when displayed on the homepage.
// The app also includes error handling for when a post is not found. The server listens on port 3000 and logs the URL to access the blog app.
// This code is a basic example of a blog application using Node.js, Express, and MongoDB. It includes routes for viewing all posts, viewing a single post, and creating a new post. The app uses EJS as the templating engine and serves static files from the 'public' directory. The MongoDB connection string is set to a local MongoDB instance, but can be changed to connect to a remote database if needed. The app uses Mongoose to interact with the MongoDB database, defining a schema for blog posts with title and content fields. The posts are sorted by creation date in descending order when displayed on the homepage. The app also includes error handling for when a post is not found. The server listens on port 3000 and logs the URL to access the blog app.
