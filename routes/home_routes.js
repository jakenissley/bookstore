var express = require('express');
var connection = require('../dbConnection');
var router = express.Router();

/* Begin Update Item Transaction Code */
// updates price of all items of this type
router.post('/updateItemPrice', function (req, res) {
    let item_type = req.body.item_type;
    let increase = req.body.increase;
    
    if (item_type == "Please Make a Selection" || increase == "") {
        res.status(406).send("Blank/Invalid input.");
    }
    else {
        connection.query('UPDATE item SET price = price * ? WHERE item.Type = ?', [increase, item_type], function (err, resp) {
            if (err) {
                console.log(err);
                res.status(400).send("Update error.");
            } else {
                res.send('Update succesfull');
            }
        });  
    }
});
/* End Update Item Transaction Code */

/* Begin Return Amount Transaction Code */

router.get('/returnAmount/:cust_id/:item_type/:date', function (req, res){
    let start_date = req.params.date + " 00:00:00.00";
    let end_date = req.params.date + " 23:59:59.999";
    let id = req.params.cust_id;
    let type = req.params.item_type;
    var query = "SELECT COUNT(*) AS amount FROM orders WHERE Order_date BETWEEN '" + 
    start_date + "' AND '" + end_date + 
    "' AND Customer_id = " + id + 
    " AND Item_id IN (SELECT Item_id FROM item WHERE item.Type = '" + type + "')";
    connection.query(query, function (err, rows, fields) {
        if (err) {
            res.status(400).send("hoe_routes/returnAmount error: error retrieving amount");
            console.log(err);
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
/* End Return Amount Transaction Code */

// returns list of item types
router.get('/getItemTypes', function (req, res){
    const query = "SELECT item.Type FROM item";
    connection.query(query, function (err, rows, fields) {
        if (err) {
            res.status(400).send("home_routes/getItemTypes error: error retrieving item types");
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