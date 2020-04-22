const Data = require("../models/data.model.js");

// Retrieve all Data from the database.
exports.findAllData = (req, res) => {
    Data.getAllData((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving data."
        });
      else res.send(data);
    });
  };

//retrieve all data from a single device
exports.findAllDataFromOneDevice = (req, res) => {
  Data.findDataById(req.params.deviceId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found data with DeviceId ${req.params.deviceId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving data with DeviceId " + req.params.deviceId
        });
      }
    } else res.send(data);
  });
};

// Find latest data from a device with a deviceId
exports.findLatestData = (req, res) => {
  Data.findLatestById(req.params.deviceId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found latest data from davice with id ${req.params.deviceId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving latest data from device with with id " + req.params.deviceId
        });
      }
    } else res.send(data);
  })
};


  