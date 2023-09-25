const express = require('express');
const app = express();
import countryRouter from './routes/countryRouter.js';
const PORT = 8000;


// Middleware to parse JSON requests
app.use(express.json());

app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');


//routes
app.use('api/countries', countryRouter);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
