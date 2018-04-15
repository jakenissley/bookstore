var express = require('express');
var connection = require('../dbConnection');
var router = express.Router();

router.get('/all', function (req, res) {
  const query = "SELECT * FROM customer";
  connection.query(query, function (err, rows, fields) {
    if (err) {
      //console.log(err);
      res.status(400).send("customer/all error: error retrieving customer table");
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

router.delete('/delete', function (req, res) {
    connection.query('DELETE FROM customer WHERE Id_no = ?', req.body.id_no, function (err, resp) {
      if (err) {
        console.log(err);
        res.status(400).send("Deletion error.");
      } else {
        res.send("Deletion successful.")
      }
    });
});

// Inserts customer into database
router.post('/add', function (req, res) {
  var newCustomer = {
    Name: req.body.name,
    Id_no: "default", //mysql handles what id to give customer
    Phone_no: req.body.phone,
    Address: req.body.address,
    Username: req.body.username,
    Password: req.body.password,
    //Created_date: "NOW()", // mysql command for current date
    Email: req.body.email
  };

  if (newCustomer.Name == "" || newCustomer.Phone_no == "" || newCustomer.Address == "" || newCustomer.Username == "" || newCustomer.Password == ""
    || newCustomer.Email == "") {
    res.status(406).send("Blank input.");
  }
  else {
    connection.query('INSERT INTO customer SET ?', newCustomer, function (err, resp) {
      if (err) {
        console.log(err);
        res.status(400).send("Insertion error.");
      } else {
        res.send('Save successful');
      }
    });
  }
});

// Return customer IDs and names
router.get('/getCustomers', function (req, res) {
  const query = "SELECT Id_no AS Cust_ID, Name AS Name FROM customer";
  connection.query(query, function (err, rows, fields) {
    if (err) {
      res.status(400).send("customer/getCustomers error: error retrieving customers");
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

router.put('/', function (req, res) {
  console.log('got here');
  res.send('complete');
});
module.exports = router;
