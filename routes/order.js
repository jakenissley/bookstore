var express = require('express');
var connection = require('../dbConnection');
var router = express.Router();

router.get('/all', function (req, res) {
  const query = "SELECT o.*, c.Name AS Customer_name, i.Name AS Item_name FROM orders o INNER JOIN customer c ON o.Customer_id = c.Id_no INNER JOIN item i ON o.Item_id = i.Item_id";
  connection.query(query, function (err, rows, fields) {
    if (err) {
      //console.log(err);
      res.status(400).send("order/all error: error retrieving order table");
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

// Inserts order into database
router.post('/add', function (req, res) {
  var newOrder = {
    Item_id: req.body.Item_id,
    Customer_id: req.body.Customer_id,
    Total_price: req.body.Total_price,
    Employee_ssn: req.body.Employee_ssn
  };

  if (newOrder.Item_id == "" || newOrder.Customer_id == "" || newOrder.Total_price == "" || newOrder.Employee_ssn == "") {
    res.status(406).send("Blank input.");
  }
  else {
    connection.query('INSERT INTO orders SET ?', newOrder, function (err, resp) {
      if (err) {
        console.log(err);
        res.status(400).send("Insertion error.");
      } else {
        res.send('Save successful');
      }
    });
  }
});

// Return total price of order
router.get('/totalPrice/:item_id', function (req, res){
  let id = req.params.item_id;
  var query = "SELECT item.Price FROM item WHERE item.Item_id = " + id;
  connection.query(query, function (err, rows, fields) {
      if (err) {
          res.status(400).send("order/totalPrice error: error retrieving price");
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

// Return item IDs and names
router.get('/getItems', function (req, res) {
  const query = "SELECT item.Item_id , item.Name FROM item";
  connection.query(query, function (err, rows, fields) {
    if (err) {
      res.status(400).send("order/getItems error: error retrieving items");
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

// Return Employee IDs and names
router.get('/getEmployees', function (req, res) {
  const query = "SELECT staff.Ssn, staff.Name FROM staff";
  connection.query(query, function (err, rows, fields) {
    if (err) {
      res.status(400).send("order/getEmployees error: error retrieving employees");
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