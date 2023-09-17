const recipe = require('./models/recipe')
const mongoose = require('mongoose')

const mongoURI = "mongodb+srv://Jrive10:Jrivera11@jrprojectsdb.ca8yti7.mongodb.net/?"
const db = mongoose.connection

mongoose.connect(mongoURI)

recipe.create([
  {
    title: 'Sample Recipe 1',
    description: 'This is a sample recipe description 1.',
    ingredients: ['Ingredient 1', 'Ingredient 2'],
    instructions: 'Sample instructions for recipe 1.',
  },
  {
    title: 'Sample Recipe 2',
    description: 'This is a sample recipe description 2.',
    ingredients: ['Ingredient A', 'Ingredient B'],
    instructions: 'Sample instructions for recipe 2.',
  }
]).then((recipe) => {
  console.log(recipe)
  db.close()
})

