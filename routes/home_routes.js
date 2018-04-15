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

/* End Update Item Transaction Code */

module.exports = router;