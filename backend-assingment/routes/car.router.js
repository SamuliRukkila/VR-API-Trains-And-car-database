const Car = require('../controllers/car.controller');

module.exports = app => {

  app.post('/car/insertcars', Car.insertCars);

  // Add new car
  app.post('/car/addcar', Car.addNewCar);

  // Delete car
  app.delete('/car/deletecar', Car.deleteCar);
  
  // Modify existing car
  app.put('/car/modifycar/:platenumber', Car.modifyCar);

  // Get 1 car by it's plate-number
  app.get('/car/getcar/:platenumber', Car.getCar);

  // Get all cars (filter by release year, name and model if wanted)
  app.get('/car/carlist/:min?/:max?/:name?/:model?', Car.getCarList);

}