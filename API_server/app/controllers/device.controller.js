const Device = require("../models/device.model.js");

// create new data
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const device = new Device({
      ID: req.body.ID,
      Password: req.body.Password,
      Name: req.body.Name,
      Status: req.body.Status
    });
  
    // Save Data in the database
    Device.create(device, (err, device) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the data."
        });
      else res.send(device);
    });
  };

// Retrieve all Devices from the database.
exports.findAllDevice = (req, res) => {
    Device.getAllDevices((err, device) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving devices."
        });
      else res.send(device);
    });
  };

  // Find a single Device with a deviceId
exports.findOneDevice = (req, res) => {
    Device.findDeviceById(req.params.deviceId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found device with id ${req.params.deviceId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving device with id " + req.params.deviceId
          });
        }
      } else res.send(device);
    });
  };

// Update a devices name with the Id in the request
exports.updateDeviceName = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Device.updateNameById(
    req.params.deviceId,
    new Data(req.body),
    (err, device) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found device with id ${req.params.deviceId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating device with id " + req.params.deviceId
          });
        }
      } else res.send(device);
    }
  );
};
  