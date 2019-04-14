const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

require('./db-connection');

// Make local variable from Express-library
const app = express();

// Use port 3000 to listen to HTTP-requests
const port = 3000;
app.listen(port, () => console.log('Backend is listening on: ' + port));

// Cross domain
app.use(cors());
// Parse requests as JSON
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
// Log all HTTP-activities
app.use(logger('dev'));

// Root URL
app.get('/', (req, res) => {
  res.send('Nothing to see here.');
});
