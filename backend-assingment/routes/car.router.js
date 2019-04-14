const Car = require('../controllers/car.controller');

module.exports = app => {

  app.post('/car/addcar', Car.addNewCar);

  app.delete('/car/deletecar', Car.deleteCar);
  
  app.put('/car/modifycar', Car.modifyCar);

  app.get('/car/:name/:model', Car.getCar);

  app.get('/car/carlist/:releaseyear/:name/:model', Get.getCarList);

}