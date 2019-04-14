const Car = require('../models/car');
const mockCars = require('../mock-data-cars');

const CarController = {

  insertCars: (req, res) => {
    Car.insertMany(mockCars)
      .then(cars => {
        return res.send('Created mock-cars');
      }).catch(err => {
        console.error(err);
        return res.status(500).send(err);
      })
  },

  // Adds a new car
  addNewCar: (req, res) => {
    Car.create({
      name: req.body.name,
      model: req.body.model,
      plateNumber: req.body.plateNumber,
      releaseYear: req.body.releaseYear,
      checkupDate: req.body.checkupDate,
      engineSize: req.body.engineSize,
      enginePower: req.body.enginePower
    }).then(car => {
      if (!car) {
        return res.status(404).send({
          'error': 'Could not create car.'
        });
      }
      return res.send('Uusi auto luotu. Rekisterinumero: ' + req.body.plateNumber);
    }).catch(err => {
      if (err.code === 11000) {
        return res.status(409).send({
          err: `Rekisterinumero (${req.body.plateNumber}) on jo käytössä.`
        });
      }
      console.error(err);
      return res.status(500).send(err);
    })
  },


  // Delete 1 car by it's plate-number
  deleteCar: (req, res) => {
    Car.findOneAndRemove({ 
      plateNumber: req.body.plateNumber
    }).then(car => {
      if (!car) {
        return res.status(404).send({
          error: 'Autoa ei löydetty rekisterinumerolla: ' + req.body.plateNumber
        });
      }
      return res.send('Auto poistettu: \n' + car);
    }).catch(err => {
      return res.status(500).send(err);
    });
  },


  // Modify 1 car
  modifyCar: (req, res) => {
    Car.findOneAndUpdate({ plateNumber: req.params.platenumber }, { 
      name: req.body.name,
      model: req.body.model,
      plateNumber: req.body.plateNumber,
      releaseYear: req.body.releaseYear,
      checkupDate: req.body.checkupDate,
      engineSize: req.body.engineSize,
      enginePower: req.body.enginePower
    }).then(car => {
      if (!car) {
        return res.status(404).send({
          err: 'Autoa ei löydetty rekisterinumerolla: ' + req.params.platenumber
        });
      }
      return res.send(car);
    }).catch(err => {
      console.error(err);
      return res.status(500).send(err);
    });
  },


  // Get cars information by it's plate-number
  getCar: (req, res) => {
    Car.findOne({
      plateNumber: req.params.platenumber
    }).then(car => {
      if (!car) {
        return res.status(404).send({
          err: 'Autoa ei löydetty rekisterinumerolla: ' + req.params.platenumber
        });
      }
      return res.send(car);
    }).catch(err => {
      console.error(err);
      return res.status(500).send(err);
    });
  },


  // Get a list of cars (according to filters)
  getCarList: (req, res) => {
    Car.find({
      // Search by name, if name-parameter is not given, search every car
      name: req.params.name ? new RegExp(req.params.name, 'i') : new RegExp('', 'i'),
      // Search by model, if model-parameter is not given, search every car
      name: req.params.model ? new RegExp(req.params.model, 'i') : new RegExp('', 'i'),
      releaseYear: { 
        $gt: req.params.min ? req.params.min : 0, 
        $lt: req.params.max ? req.params.max : 2100 
      },
    }).then(cars => {
      if (cars.length < 1) {
        return res.status(404).send({
          err: 'Yhtään autoa ei löydetty'
        });
      }
      res.send(cars);
    }).catch(err => {
      console.error(err);
      return res.status(500).send(err);
    })
  }

}

module.exports = CarController;