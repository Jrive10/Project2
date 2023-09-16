// routes
const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe')

//new recipe create (C - Create)
router.post('/recipes', async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body)
    res.status(201).json(recipe)
  }catch (err){
    res.status(400).json({error: err.message})
  }
})

//get all recipes (R - Read)
router.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find()
    res.json(recipes)
  }catch (err) {
    res.status(500).json({ error: err.message})
  }
})

// get a single recipe by id (R - Read)
router.get('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
    if (!recipe) throw new Error('Recipe not found')
    res.json(recipe)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
})

// Update a recipe by ID (U - Update)
router.put('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!recipe) throw new Error('Recipe not found')
    res.json(recipe)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
})

// Delete a recipe by ID (D - Delete)
router.delete('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndRemove(req.params.id)
    if (!recipe) throw new Error('Recipe not found')
    res.json(recipe)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
})

module.exports = router

