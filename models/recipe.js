const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: String,
  ingredients: {
    type: [String],
    require: true,
  },
  instructions: {
    type: [String],
    require: true,
  },
  category: String
})

module.exports = mongoose.model('Recipe', recipeSchema)
