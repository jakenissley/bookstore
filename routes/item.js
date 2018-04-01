var express = require('express');
var connection = require('../dbConnection');
var router = express.Router();

router.get('/all', function (req, res) {
    const query = "SELECT * FROM item";
    connection.query(query, function (err, rows, fields) {
        if (err) {
            //console.log(err);
            res.status(400).send("item/all error: error retrieving item table");
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
