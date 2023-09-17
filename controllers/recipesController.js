const Recipe = require('../models/recipe'); // Adjust the path as needed

const recipesController = {
  // Index - Display a list of recipes
  index: async (req, res) => {
    try {
      const recipes = await Recipe.find();
      res.render('recipes/index.ejs', { recipes });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  // New - Display a form to create a new recipe
  new: (req, res) => {
    res.render('recipes/new.ejs');
  },

  // Create - Add a new recipe to the database
  create: async (req, res) => {
    try {
      const { title, description, ingredients, instructions } = req.body;
      const recipe = new Recipe({
        title,
        description,
        ingredients: ingredients.split(',').map((ingredient) => ingredient.trim()),
        instructions,
      });
      await recipe.save();
      res.redirect('/recipes');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  // Show - Display details of a specific recipe
  show: async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      res.render('recipes/show.ejs', { recipe });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  // Edit - Display a form to edit an existing recipe
  edit: async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      res.render('recipes/edit.ejs', { recipe });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  // Update - Update an existing recipe in the database
  update: async (req, res) => {
    try {
      const { title, description, ingredients, instructions } = req.body;
      await Recipe.findByIdAndUpdate(req.params.id, {
        title,
        description,
        ingredients: ingredients.split(',').map((ingredient) => ingredient.trim()),
        instructions,
      });
      res.redirect('/recipes/' + req.params.id);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  // Destroy - Delete a recipe from the database
  destroy: async (req, res) => {
    try {
      await Recipe.findByIdAndRemove(req.params.id);
      res.redirect('/recipes');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },
};

module.exports = recipesController;
