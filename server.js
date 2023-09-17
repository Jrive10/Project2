const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
require('dotenv').config(); // Load environment variables from .env file
const path = require('path');


const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Specify the directory where your views are located
app.set('views', path.join(__dirname, 'views'));

// Import the Recipe model and recipesController
const Recipe = require('./models/recipe');
const recipesController = require('./controllers/recipesController');

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use('/images', express.static('images'));

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    startServer();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Define the startServer function
function startServer() {
  app.get('/', async (req, res) => {
    try {
      // Retrieve recipes from the database
      const recipes = await Recipe.find();
      // Render the main page view with the retrieved recipes
      res.render('index.ejs', { recipes });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
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

// Handle unhandled promise rejections (just in case)
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
});

// Handle uncaught exceptions (just in case)
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});







