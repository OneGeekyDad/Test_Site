// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
// This code defines a Mongoose schema for a blog post. The schema includes two required fields: title and content. The timestamps option automatically adds createdAt and updatedAt fields to the schema.
// The model is then exported for use in other parts of the application.