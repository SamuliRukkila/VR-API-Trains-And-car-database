const Car = require('../models/car');

const CarController = {

  // Adds a new car
  addNewCar: (req, res) => {
    Car.create({
      name: req.body.name,
      model: req.body.name,
      plateNumber: req.body.plateNumber,
      releaseYear: req.body.releaseYear,
      checkUpDate: req.body.checkupDate,
      engineSize: req.body.engineSize,
      enginePower: req.body.enginePower
    }), (err, car) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!car) {
        return res.status(404).send({
          'error': 'Could not create car.'
        });
      }
      return res.send(car);
    }
  },

  // Delete 1 car by it's plate-number
  deleteCar: (req, res) => {
    Car.findOneAndRemove({ 
      plateNumber: req.body.plateNumber
    }, (err, car) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!car) {
        return res.status(404).send({
          error: 'Could not find car with plate-number: ' + req.body.plateNumber
        });
      }
      return res.send(car);
    })
  },

  // Modify 1 car
  modifyCar: (req, res) => {

  },

  // Get cars information by it's plate-number
  getCar: (req, res) => {

  },

  // Get a list of cars (according to filters)
  getCarList: (req, res) => {

  }

}

module.exports = CarController;