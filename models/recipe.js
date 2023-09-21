const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: String,
  description: String,
  ingredients: [String],
  instructions: String,
  Image: String,
});

module.exports = mongoose.model('Recipe', recipeSchema);

