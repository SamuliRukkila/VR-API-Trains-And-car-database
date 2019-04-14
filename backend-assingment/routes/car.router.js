const Car = require('../controllers/car.controller');

module.exports = app => {

  // Add new car
  app.post('/car/addcar', Car.addNewCar);

  // Delete car
  app.delete('/car/deletecar', Car.deleteCar);
  
  // Modify existing car
  app.put('/car/modifycar', Car.modifyCar);

  // Get 1 car by it's name and model
  app.get('/car/:name/:model', Car.getCar);

  // Get all cars (filter by release year, name and model if wanted)
  app.get('/car/carlist/:releaseyear/:name/:model', Get.getCarList);

}