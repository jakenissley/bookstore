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
    Super_ssn: req.body.Super_ssn,
    Position: req.body.Position
  };

  if (newStaff.Name == "" || newStaff.Ssn == "" || newStaff.Bdate == "" || newStaff.Address == "" || newStaff.Sex == ""
    || newStaff.Salary == "" || newStaff.Super_ssn == "" || newStaff.Position == "") {
    res.status(406).send("Blank input.");
  }
  else {
    connection.query('INSERT INTO staff SET ?', newStaff, function (err, resp) {
      if (err) {
        console.log(err);
        res.status(400).send("Insertion error.");
      } else {
        res.send('Save successful');
      }
    });
  }
});

router.get('/all', function (req, res) {
  const query = "SELECT * FROM staff";
  connection.query(query, function (err, rows, fields) {
    if (err) {
      //console.log(err);
      res.status(400).send("staff/all error: error retrieving staff table");
    } else {
      if (rows.length > 0) {
        let returnData = {};
        returnData['sEcho'] = 1;
        returnData['iTotalRecords'] = rows.length;
        returnData['iTotalDisplayRecords'] = rows.length;
        returnData['data'] = rows;
        res.send(JSON.stringify(returnData));
      } else {
        res.status(204).send("No Content.")
      }
    }
  });
});

// returns list of supervisors
router.get('/getSuper', function (req, res) {
  const query = "SELECT staff.Name, staff.Ssn FROM staff WHERE staff.Position = 'Supervisor'";
  connection.query(query, function (err, rows, fields) {
    if (err) {
      res.status(400).send("staff/getSuper error: error retrieving supervisors");
    } else {
      if (rows.length > 0) {
        let returnData = {};
        returnData['sEcho'] = 1;
        returnData['iTotalRecords'] = rows.length;
        returnData['iTotalDisplayRecords'] = rows.length;
        returnData['data'] = rows;
        res.send(JSON.stringify(returnData));
      } else {
        res.status(204).send("No Content.")
      }
    }
  });
});

module.exports = router;