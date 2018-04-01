var express = require('express');
var connection = require('../dbConnection');
var router = express.Router();

/* No Content 
router.get('/:customer_number', function (req, res) {
  var customer_id = req.params.customer_number
  const query = 'select Name from customer where Id_no = ?';
  console.log(customer_id);
  connection.query(query, [customer_id], function (err, rows, fields) {
    if (err) {
      console.log(err)
      res.status(400).send("Query error.");
    } else {
      if (rows.length > 0) {
        res.send(JSON.stringify(rows));
      } else {
        res.status(400).send("No Content.");
      }
    }
  });
}); */

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

// Inserts customer into database
router.post('/', function (req, res) {
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
        res.send('Save succesfull');
      }
    });
  }
});

router.put('/', function (req, res) {
  console.log('got here');
  res.send('complete');
});
module.exports = router;
