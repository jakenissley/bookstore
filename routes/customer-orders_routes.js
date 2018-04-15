var express = require('express');
var connection = require('../dbConnection');
var router = express.Router();

router.get('/all', function (req, res) {
    const query = "SELECT customer.Name AS Customer_Name, customer.Id_no as Id_no FROM orders INNER JOIN customer ON orders.Customer_id = customer.Id_no GROUP BY customer.Name";
    connection.query(query, function (err, rows, fields) {
      if (err) {
        //console.log(err);
        res.status(400).send("customer-orders/all error: error retrieving data");
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

  router.get('/getCustomerItems/:customer_id', function(req, res) {
    var customer_id = req.params.customer_id
    const query = 'SELECT item.Item_id AS Item_ID, item.Name AS Item_Name, orders.Total_price FROM orders INNER JOIN item ON orders.Item_id = item.Item_id INNER JOIN customer ON orders.Customer_id = customer.Id_no WHERE customer.Id_no = ?';
    connection.query(query,[customer_id], function(err, rows, fields) {
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
  });

module.exports = router;