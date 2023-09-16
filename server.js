const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

// Import the Recipe model and recipesController
const Recipe = require('./models/recipe');
const recipesController = require('./controllers/recipesController');

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
  startServer();
});

function startServer() {
  app.get('/', (req, res) => {
    res.send('Hello world!');
  });

  // Index - Display a list of recipes
  app.get('/recipes', recipesController.index);

  // New - Display a form to create a new recipe
  app.get('/recipes/new', recipesController.new);

  // Create - Add a new recipe to the database
  app.post('/recipes', recipesController.create);

  // Show - Display details of a specific recipe
  app.get('/recipes/:id', recipesController.show);

  // Edit - Display a form to edit an existing recipe
  app.get('/recipes/:id/edit', recipesController.edit);

  // Update - Update an existing recipe in the database
  app.put('/recipes/:id', recipesController.update);

  // Destroy - Delete a recipe from the database
  app.delete('/recipes/:id', recipesController.destroy);

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
  });
}



