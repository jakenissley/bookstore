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

module.exports = router;