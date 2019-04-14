const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  model: { type: String, required: true },
  plateNumber: { type: String, required: true, unique: true },
  releaseYear: { type: Number, required: true },
  checkupDate: { type: Date, required: true },
  engineSize: { type: String, required: true },
  enginePower: { type: String, required: true }
});

module.exports = mongoose.model('Car', carSchema);