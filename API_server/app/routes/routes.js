//module.exports = app => {
//  const customers = require("../controllers/customer.controller.js");
//
//  // Create a new Customer
//  app.post("/customers", customers.create);
//
//  // Retrieve all Customers
//  app.get("/customers", customers.findAll);
//
//  // Retrieve a single Customer with customerId
//  app.get("/customers/:customerId", customers.findOne);
//
//  // Update a Customer with customerId
//  app.put("/customers/:customerId", customers.update);
//
//  // Delete a Customer with customerId
//  app.delete("/customers/:customerId", customers.delete);
//
//  // Create a new Customer
//  app.delete("/customers", customers.deleteAll);
//};

module.exports = app => {
  const data = require("../controllers/data.controller.js");

  // Create new data
  app.post("/data", data.create);

  // Retrieve all data
  app.get("/data", data.findAllData);

  // Retrieve all devices
  app.get("/device", data.findAllDevice);

  // Retrieve a single Customer with customerId
  app.get("/device/:deviceId", data.findOneDevice);

  // Retrieve all data from a single device
  app.get("/data/:deviceId", data.findAllDataFromOneDevice);

  // Retrieve a single Customer with customerId
  app.get("/device/:deviceId/latest", data.findLatestData);

  // Update name of a device
  app.put("/device/name/:deviceId", data.updateDeviceName);
};