var express = require('express');
var connection = require('../dbConnection');
var router = express.Router();

// Inserts staff into database
router.post('/add', function (req, res) {
    var newStaff = {
      Name: req.body.Name,
      Ssn: req.body.Ssn,
      Bdate: req.body.Bdate,
      Address: req.body.Address,
      Sex: req.body.Sex,
      Salary: req.body.Salary,
      Superssn: req.body.Superssn,
      Position: req.body.Position
    };
  
    if (newStaff.Name == "" || newStaff.Ssn == "" || newStaff.Bdate == "" || newStaff.Address == "" || newStaff.Sex == ""
      || newStaff.Salary == "" || newStaff.Superssn || newStaff.Position) {
      res.status(406).send("Blank input.");
    }
    else {
      connection.query('INSERT INTO customer SET ?', newStaff, function (err, resp) {
        if (err) {
          console.log(err);
          res.status(400).send("Insertion error.");
        } else {
          res.send('Save successful');
        }
      });
    }
  });
module.exports = router;