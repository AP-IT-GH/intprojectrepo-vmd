const sql = require("../db.js");

// constructor
const Data = function(data) {
  this.Device_ID = data.Device_ID;
  this.Temperature = data.Temperature;
  this.Humidity = data.Humidity;
  this.Moisture = data.Moisture;
  this.Time = data.Time;
  this.Date = data.Date;
  this.Battery = data.Battery;
};

//Create new data
Data.create = (newData, result) => {
  sql.query("INSERT INTO Data SET ?", newData, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created data: ", { id: res.insertId, ...newData });
    result(null, { id: res.insertId, ...newData });
  });
};

//Retrieve all data
Data.getAllData = result => {
  sql.query("SELECT * FROM vmdDB1.Data;", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("DataTable: ", res);
    result(null, res);
  });
};

//retrieve all data from a single device
Data.findDataById = (deviceId, result) => {
  sql.query(`SELECT * FROM vmdDB1.Data WHERE Device_ID = ${deviceId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("DataTable: ", res);
    result(null, res);
  });
};

//Retrieve all devices
Data.getAllDevices = result => {
  sql.query("SELECT * FROM vmdDB1.Device;", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("DeviceTable: ", res);
    result(null, res);
  });
};

//retrieve single device with id
Data.findDeviceById = (deviceId, result) => {
  sql.query(`SELECT * FROM vmdDB1.Device where ID = ${deviceId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found device: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found device with the id
    result({ kind: "not_found" }, null);
  });
};

//retrieve latest data from device with id
Data.findLatestById = (deviceId, result) => {
  sql.query(`SELECT * FROM vmdDB1.Data INNER JOIN vmdDB1.Device ON vmdDB1.Data.Device_ID = vmdDB1.Device.ID where vmdDB1.Device.ID = ${deviceId} ORDER BY vmdDB1.Data.ID DESC LIMIT 1;`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found device: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found device with the id
    result({ kind: "not_found" }, null);
  });
};

Data.updateNameById = (deviceId, deviceName, result) => {
  sql.query(
    "UPDATE vmdDB1.Device SET Name = '?' WHERE (ID = '?');",
    [deviceName, deviceId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Device with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Device: ", { id: deviceId, ...deviceName });
      result(null, { id: deviceId, ...deviceName });
    }
  );
};

  module.exports = Data;