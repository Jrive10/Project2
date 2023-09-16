// // IMPORTS
// const express = require('express')
// const app = express()

// require('dotenv').config()

// const PORT = process.env.PORT || 3000

// // setup database 
// const mongoose = require('mongoose')
// const mongoURI = process.env.MONGO_URI

// // connect to mongo 
// mongoose.connect(mongoURI)

// const db = mongoose.connection
// // optional create status messages to check mongo connection 
// db.on('error', (err) => { console.log('ERROR: ' , err)})
// db.on('connected', () => { console.log('mongo connected')})
// db.on('disconnected', () => { console.log('mongo disconnected')})

// app.get('/', (req, res) => {
//    res.send('Hello world!')
// })

// app.listen(PORT, () => {
//     console.log(`Server is listening on PORT: ${PORT}`)
// })

// app.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Connect to MongoDB (replace 'your-database-url' with your actual MongoDB connection URL)
mongoose.connect('mongodb://your-database-url', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Define routes 
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
