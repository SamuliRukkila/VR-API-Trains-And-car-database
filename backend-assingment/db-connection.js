const mongoose = require('mongoose');

const conn = mongoose.connect('mongodb://localhost:27017/car_database',
  { reconnectInterval: 1000, useNewUrlParser: true }, err => {
    if (err) console.log('Error with Mongo: ' + err);
    else console.log('Connected to MongoDB car_database!');
});

module.exports = conn;